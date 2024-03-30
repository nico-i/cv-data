import { Ed } from "entities/ed";
import { InvalidEdDocError, type EdRepo } from "entities/ed/repo";
import { InvalidLocalizedEntityError } from "entities/entity";
import type { StrapiClient } from "infrastructure/interfaces/strapi";
import { Locale } from "value-objects/locale";
import { Doc } from "../../../../value-objects/doc/doc";

export class StrapiEdRepo implements EdRepo {
  constructor(private readonly strapiClient: StrapiClient) {}

  async getAllEds(locale: Locale): Promise<Ed[]> {
    const res = await this.strapiClient.sdk.GetAllEds({ locale: locale.value });

    const eds: Ed[] = [];

    for (const resEd of res.eds?.data || []) {
      if (!resEd?.id || !resEd?.attributes) {
        continue;
      }

      const { institute, degree, start, grade, url, doc, end } =
        resEd.attributes;

      if (!resEd.attributes.locale) {
        throw new InvalidLocalizedEntityError();
      }

      let edDoc: Doc | undefined = undefined;
      if (doc) {
        if (!doc.data?.attributes?.url) {
          throw new InvalidEdDocError("url not found in doc data attributes");
        }
        edDoc = new Doc(new URL(doc.data.attributes.url));
      }

      eds.push(
        new Ed(
          resEd.id,
          new Locale(resEd.attributes.locale),
          institute,
          degree,
          start,
          grade,
          url ? new URL(url) : undefined,
          edDoc,
          end
        )
      );
    }

    return eds;
  }
}
