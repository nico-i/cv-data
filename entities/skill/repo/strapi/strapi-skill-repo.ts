import { InvalidLocalizedEntityError } from "entities/entity";
import { Skill } from "entities/skill";
import {
  InvalidSkillIconError,
  type SkillRepo,
} from "entities/skill/repo/skill-repo";
import type { StrapiClient } from "infrastructure/interfaces/strapi";
import { Locale } from "value-objects/locale";
import { Svg } from "value-objects/svg";
import { Markdown } from "../../../../value-objects/markdown/markdown";

export class StrapiSkillRepo implements SkillRepo {
  constructor(private readonly strapiClient: StrapiClient) {}
  async getAllSkills(locale: Locale): Promise<Skill[]> {
    const res = await this.strapiClient.sdk.GetAllSkills({
      locale: locale.value,
    });
    const skills: Skill[] = [];

    for (const resSkill of res.skills?.data || []) {
      if (!resSkill.id || !resSkill.attributes) {
        continue;
      }
      const { locale, name, proficiency, summary, svg, url } =
        resSkill.attributes;

      if (!locale) {
        throw new InvalidLocalizedEntityError();
      }

      let skillIcon: Svg | undefined = undefined;
      if (svg) {
        if (!svg.data?.attributes?.url) {
          throw new InvalidSkillIconError(
            "url not found in icon data attributes"
          );
        }
        skillIcon = new Svg(new URL(svg.data.attributes.url));
      }

      skills.push(
        new Skill(
          resSkill.id,
          new Locale(locale),
          name,
          proficiency,
          new Markdown(summary),
          new URL(url),
          skillIcon
        )
      );
    }

    return skills;
  }
}
