import { LocalizedEntity } from "@/entities/entity";
import type { Doc } from "@/value-objects/doc";
import type { Locale } from "@/value-objects/locale";
import type { Svg } from "@/value-objects/svg";

export enum LangLevel {
  A1 = "A1",
  A2 = "A2",
  B1 = "B1",
  B2 = "B2",
  C1 = "C1",
  C2 = "C2",
}

export class InvalidLangLevelError extends Error {
  constructor(e: unknown) {
    super(`Invalid Lang Level: ${e}`);
  }
}

export class Lang extends LocalizedEntity {
  public readonly level: LangLevel;
  constructor(
    id: string,
    locale: Locale,
    public readonly name: string,
    public readonly icon: Svg,
    level: LangLevel | string,
    public readonly doc?: Doc
  ) {
    super(id, locale);
    if (typeof level === "string") {
      if (!Object.values(LangLevel).includes(level as LangLevel)) {
        throw new InvalidLangLevelError(level);
      }
      this.level = level as LangLevel;
    } else {
      this.level = level;
    }
  }
}
