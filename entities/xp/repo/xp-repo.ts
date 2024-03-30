import type { Xp } from "entities/xp";
import type { Locale } from "value-objects/locale";

export interface XpRepo {
  getAllXps(locale: Locale): Promise<Xp[]>;
}
