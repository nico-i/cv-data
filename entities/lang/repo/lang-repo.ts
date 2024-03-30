import type { Lang } from "entities/lang/lang";
import type { Locale } from "value-objects/locale";

export interface LangRepo {
  getAllLangs(locale: Locale): Promise<Lang[]>;
}

export class InvalidLangIconError extends Error {
  constructor(e: unknown) {
    super(`Invalid Lang Icon: ${e}`);
  }
}

export class InvalidLangDocError extends Error {
  constructor(e: unknown) {
    super(`Invalid Lang Doc: ${e}`);
  }
}
