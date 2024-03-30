import { LocalizedEntity } from "entities/entity";
import type { Locale } from "value-objects/locale";

export class Interest extends LocalizedEntity {
  constructor(id: string, locale: Locale, public name: string) {
    super(id, locale);
  }
}
