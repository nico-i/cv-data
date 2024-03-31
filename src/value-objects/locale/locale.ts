export enum ELocale {
  EN = "en",
  DE = "de",
}

export class Locale {
  public readonly value: ELocale;

  constructor(localeStr: string);
  constructor(localeStr: ELocale);
  constructor(localeStr: string) {
    if (!Object.values(ELocale).includes(localeStr as ELocale)) {
      throw new InvalidLocaleError();
    }
    this.value = localeStr as ELocale;
  }
}

export class InvalidLocaleError extends Error {
  constructor() {
    super("Invalid locale");
  }
}
