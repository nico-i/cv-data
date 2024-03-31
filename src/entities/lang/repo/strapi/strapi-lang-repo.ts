import { InvalidLocalizedEntityError } from "@/entities/entity";
import { Lang } from "@/entities/lang";
import {
  InvalidLangIconError,
  type LangRepo,
} from "@/entities/lang/repo/lang-repo";
import type { StrapiClient } from "@/infrastructure/interfaces/strapi";
import { Doc } from "@/value-objects/doc";
import { Locale } from "@/value-objects/locale";
import { Svg } from "@/value-objects/svg";

export class StrapiLangRepo implements LangRepo {
  constructor(private readonly strapiClient: StrapiClient) {}

  async getAllLangs(locale: Locale): Promise<Lang[]> {
    const res = await this.strapiClient.sdk.GetLangs({ locale: locale.value });

    const langs: Lang[] = [];

    for (const resLang of res.langs?.data || []) {
      if (!resLang?.id || !resLang?.attributes) {
        continue;
      }

      const { name, level, locale, icon } = resLang.attributes;

      if (!locale) {
        throw new InvalidLocalizedEntityError();
      }

      let langIcon: Svg;
      if (!icon?.data?.attributes?.url) {
        throw new InvalidLangIconError("url not found in icon data attributes");
      }
      langIcon = new Svg(new URL(icon.data.attributes.url));

      langs.push(
        new Lang(
          resLang.id,
          new Locale(locale),
          name,
          langIcon,
          level,
          resLang.attributes.doc?.data?.attributes?.url
            ? new Doc(new URL(resLang.attributes.doc.data.attributes.url))
            : undefined
        )
      );
    }

    return langs;
  }
}
