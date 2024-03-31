import type { Ed } from "@/entities/ed";
import type { Locale } from "@/value-objects/locale";

export interface EdRepo {
  getAllEds(locale: Locale): Promise<Ed[]>;
}

export class InvalidEdDocError extends Error {
  constructor(e: unknown) {
    super(`Invalid Ed Doc: ${e}`);
  }
}
