import { Ed } from "@/entities/ed";
import { type EdRepo } from "@/entities/ed/repo";
import { InvalidLocalizedEntityError } from "@/entities/entity";
import type { StrapiClient } from "@/infrastructure/interfaces/strapi";
import { Doc } from "@/value-objects/doc/doc";
import { Locale } from "@/value-objects/locale";

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

      eds.push(
        new Ed(
          resEd.id,
          new Locale(resEd.attributes.locale),
          institute,
          degree,
          start,
          grade,
          url ? new URL(url) : undefined,
          resEd.attributes.doc?.data?.attributes?.url
            ? new Doc(new URL(resEd.attributes.doc.data.attributes.url))
            : undefined,
          end
        )
      );
    }

    return eds;
  }
}
