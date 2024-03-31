import type { Ed } from "@/entities/ed";
import type { Locale } from "@/value-objects/locale";

export interface EdRepo {
  getAllEds(locale: Locale): Promise<Ed[]>;
}
