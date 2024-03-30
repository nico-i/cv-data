import { LocalizedEntity } from "entities/entity";
import type { Doc } from "value-objects/doc";
import type { Locale } from "value-objects/locale";

export class Ed extends LocalizedEntity {
  public readonly start: Date;
  public readonly end?: Date;

  constructor(
    id: string,
    locale: Locale,
    public readonly institute: string,
    public readonly degree: string,
    start: string | Date,
    public readonly grade: string,
    public readonly url?: InstanceType<typeof URL>,
    public readonly doc?: Doc,
    end?: string
  ) {
    super(id, locale);
    if (typeof start === "string") {
      this.start = new Date(start);
    } else {
      this.start = start;
    }

    if (!!end) {
      if (typeof end === "string") {
        this.end = new Date(end);
      } else {
        this.end = end;
      }
    }
  }
}
