import type { Interest } from "entities/interest";
import type { Locale } from "value-objects/locale";

export interface InterestRepo {
  getAllInterests(locale: Locale): Promise<Interest[]>;
}

export class InvalidInterestError extends Error {
  constructor(e: unknown) {
    super(`Invalid interest: ${e}`);
  }
}
