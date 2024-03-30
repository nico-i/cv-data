import { LocalizedEntity } from "entities/entity";
import type { Image } from "value-objects/image";
import type { Link } from "value-objects/link";
import type { Locale } from "value-objects/locale";

export class Info extends LocalizedEntity {
  public readonly dob: Date;
  constructor(
    id: string,
    locale: Locale,
    public readonly portrait: Image,
    public readonly address: string,
    public readonly occupation: string,
    public readonly name: string,
    public readonly phone: string,
    dob: string | Date,
    public readonly contacts?: Link[],
    public readonly bio?: string
  ) {
    super(id, locale);
    if (typeof dob === "string") {
      this.dob = new Date(dob);
    } else {
      this.dob = dob;
    }
  }
}
