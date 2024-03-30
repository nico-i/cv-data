import { LocalizedEntity } from "entities/entity";
import type { Locale } from "value-objects/locale";
import type { Markdown } from "value-objects/markdown/markdown";

export class Xp extends LocalizedEntity {
  public readonly start: Date;
  public readonly end?: Date;

  constructor(
    id: string,
    locale: Locale,
    public readonly position: string,
    public readonly company: string,
    start: string | Date,
    public readonly info: Markdown,
    end?: string | Date,
    public readonly url?: InstanceType<typeof URL>
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
