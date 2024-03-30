import { InvalidLocalizedEntityError } from "entities/entity";
import { Interest } from "entities/interest";
import {
  InvalidInterestError,
  type InterestRepo,
} from "entities/interest/repo/interest-repo";
import type { StrapiClient } from "infrastructure/interfaces/strapi";
import { Locale } from "value-objects/locale";

export class StrapiInterestRepo implements InterestRepo {
  constructor(private readonly strapiClient: StrapiClient) {}

  async getAllInterests(locale: Locale): Promise<Interest[]> {
    const res = await this.strapiClient.sdk.GetInterests({
      locale: locale.value,
    });

    if (!res.interests?.data) {
      return [];
    }

    return res.interests.data.map((resInterest) => {
      if (!resInterest.id) {
        throw new InvalidInterestError("Interest ID is missing");
      }

      if (!resInterest.attributes) {
        throw new InvalidInterestError("Interest attributes are missing");
      }

      const { locale, name } = resInterest.attributes;

      if (!locale) {
        throw new InvalidLocalizedEntityError();
      }

      return new Interest(resInterest.id, new Locale(locale), name);
    });
  }
}
