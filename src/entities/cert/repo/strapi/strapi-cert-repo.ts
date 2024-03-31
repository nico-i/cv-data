import { Cert } from "@/entities/cert";
import { type CertRepo } from "@/entities/cert/repo/cert-repo";
import { InvalidLocalizedEntityError } from "@/entities/entity";
import type { StrapiClient } from "@/infrastructure/interfaces/strapi";
import { Doc } from "@/value-objects";
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

      certs.push(
        new Cert(
          resCert.id,
          title,
          new Locale(locale),
          issuer,
          received,
          new Markdown(info),
          resCert.attributes.doc?.data?.attributes?.url
            ? new Doc(new URL(resCert.attributes.doc.data.attributes.url))
            : undefined,
          url ? new URL(url) : undefined
        )
      );
    }
    return certs;
  }
}
