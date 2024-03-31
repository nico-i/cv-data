import { Cert } from "@/entities/cert";
import {
  InvalidCertDocError,
  type CertRepo,
} from "@/entities/cert/repo/cert-repo";
import { InvalidLocalizedEntityError } from "@/entities/entity";
import type { StrapiClient } from "@/infrastructure/interfaces/strapi";
import { Doc } from "@/value-objects/doc";
import { Locale } from "@/value-objects/locale";
import { Markdown } from "@/value-objects/markdown/markdown";

export class StrapiCertRepo implements CertRepo {
  constructor(private readonly strapiClient: StrapiClient) {}
  async getAllCerts(locale: Locale) {
    const res = await this.strapiClient.sdk.GetAllCerts({
      locale: locale.value,
    });
    const certs: Cert[] = [];

    for (const resCert of res.certs?.data || []) {
      if (!resCert?.id || !resCert?.attributes) {
        continue;
      }

      const { locale, title, issuer, received, info, doc, url } =
        resCert.attributes;

      if (!locale) {
        throw new InvalidLocalizedEntityError();
      }
      let certDoc: Doc | undefined;

      if (doc) {
        if (!doc.data?.attributes?.url) {
          throw new InvalidCertDocError();
        }
        certDoc = new Doc(new URL(doc.data.attributes.url));
      } else {
        certDoc = undefined;
      }

      certs.push(
        new Cert(
          resCert.id,
          title,
          new Locale(locale),
          issuer,
          received,
          new Markdown(info),
          certDoc,
          url ? new URL(url) : undefined
        )
      );
    }
    return certs;
  }
}
