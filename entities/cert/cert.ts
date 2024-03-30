import { LocalizedEntity } from "entities/entity";
import type { Doc } from "value-objects/doc";
import type { Locale } from "value-objects/locale";
import type { Markdown } from "value-objects/markdown/markdown";

export class Cert extends LocalizedEntity {
  public readonly received: Date;

  constructor(
    id: string,
    public readonly title: string,
    locale: Locale,
    public readonly issuer: string,
    received: string | Date,
    public readonly infoMdStr: Markdown,
    public readonly doc?: Doc,
    public readonly url?: InstanceType<typeof URL>
  ) {
    super(id, locale);
    if (typeof received === "string") {
      this.received = new Date(received);
    } else {
      this.received = received;
    }
  }
}
