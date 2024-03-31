import { LocalizedEntity } from "@/entities/entity";
import type { Skill } from "@/entities/skill";
import type { Image } from "@/value-objects/image";
import type { Link } from "@/value-objects/link";
import type { Locale } from "@/value-objects/locale";
import type { Markdown } from "@/value-objects/markdown/markdown";

export class Project extends LocalizedEntity {
  readonly start: Date;
  readonly end?: Date;

  constructor(
    id: string,
    locale: Locale,
    public readonly title: string,
    public readonly slug: string,
    start: string | Date,
    public readonly tldr: string,
    end?: string | Date,
    public readonly headerImage?: Image,
    public readonly workHours?: number,
    public readonly mdSummary?: Markdown,
    public readonly demoUrl?: InstanceType<typeof URL>,
    public readonly links?: Link[],
    public readonly technologies?: Skill[]
  ) {
    super(id, locale);
    if (typeof start === "string") this.start = new Date(start);
    else this.start = start;

    if (end) {
      if (typeof end === "string") this.end = new Date(end);
      else this.end = end;
    }
  }
}
