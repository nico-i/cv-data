import { InvalidLocalizedEntityError } from "entities/entity";
import { Xp } from "entities/xp";
import type { XpRepo } from "entities/xp/repo/xp-repo";
import type { StrapiClient } from "infrastructure/interfaces/strapi";
import { Locale } from "value-objects/locale";
import { Markdown } from "value-objects/markdown";

export class StrapiXpRepo implements XpRepo {
  constructor(private strapiClient: StrapiClient) {}
  async getAllXps(locale: Locale): Promise<Xp[]> {
    const res = await this.strapiClient.sdk.GetAllXps({
      locale: locale.value,
    });
    const xps: Xp[] = [];

    for (const resXp of res.xps?.data || []) {
      if (!resXp?.id || !resXp?.attributes) {
        continue;
      }

      const { locale, position, company, info, url, start, end } =
        resXp.attributes;

      if (!locale) {
        throw new InvalidLocalizedEntityError();
      }

      xps.push(
        new Xp(
          resXp.id,
          new Locale(locale),
          position,
          company,
          start,
          new Markdown(info),
          end,
          url ? new URL(url) : undefined
        )
      );
    }
    return xps;
  }
}
