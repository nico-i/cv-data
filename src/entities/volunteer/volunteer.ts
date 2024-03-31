import { LocalizedEntity } from "@/entities/entity";
import type { Doc } from "@/value-objects/doc";
import type { Locale } from "@/value-objects/locale";
import type { Markdown } from "@/value-objects/markdown/markdown";

export class Volunteer extends LocalizedEntity {
  public readonly start: Date;
  public readonly end?: Date;

  constructor(
    id: string,
    locale: Locale,
    public readonly activity: string,
    public readonly org: string,
    start: string | Date,
    end?: string | Date,
    public readonly url?: InstanceType<typeof URL>,
    public readonly mdSummary?: Markdown,
    public readonly doc?: Doc
  ) {
    super(id, locale);
    if (typeof start === "string") {
      this.start = new Date(start);
    } else {
      this.start = start;
    }

    if (end) {
      if (typeof end === "string") {
        this.end = new Date(end);
      } else {
        this.end = end;
      }
    }
  }
}
