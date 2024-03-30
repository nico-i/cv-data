import { InvalidLocalizedEntityError } from "entities/entity";
import { Interest } from "entities/interest";
import { type InterestRepo } from "entities/interest/repo/interest-repo";
import type { StrapiClient } from "infrastructure/interfaces/strapi";
import { Locale } from "value-objects/locale";

export class StrapiInterestRepo implements InterestRepo {
  constructor(private readonly strapiClient: StrapiClient) {}

  async getAllInterests(locale: Locale): Promise<Interest[]> {
    const res = await this.strapiClient.sdk.GetInterests({
      locale: locale.value,
    });
    const interests: Interest[] = [];
    for (const resInterest of res.interests?.data || []) {
      if (!resInterest?.id || !resInterest?.attributes) {
        continue;
      }

      const { locale, name } = resInterest.attributes;

      if (!locale) {
        throw new InvalidLocalizedEntityError();
      }

      interests.push(new Interest(resInterest.id, new Locale(locale), name));
    }
    return interests;
  }
}
