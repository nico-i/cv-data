import { LocalizedEntity } from "entities/entity";
import type { Locale } from "value-objects/locale";
import type { Markdown } from "value-objects/markdown/markdown";
import type { Svg } from "value-objects/svg";

export class Skill extends LocalizedEntity {
  constructor(
    id: string,
    locale: Locale,
    public readonly name: string,
    public readonly proficiency: number,
    public readonly summaryMd: Markdown,
    public readonly url: InstanceType<typeof URL>,
    public readonly icon?: Svg
  ) {
    super(id, locale);
  }
}
