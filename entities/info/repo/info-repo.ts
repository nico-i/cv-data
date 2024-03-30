import type { Info } from "entities/info";
import type { Locale } from "value-objects/locale";

export class InvalidInfoError extends Error {
  constructor(e: unknown) {
    super(`Invalid info: ${e}`);
  }
}

export interface InfoRepo {
  getInfo(locale: Locale): Promise<Info>;
}
