import { InvalidLocalizedEntityError } from "entities/entity";
import { Volunteer } from "entities/volunteer";
import type { VolunteerRepo } from "entities/volunteer/repo/volunteer-repo";
import type { StrapiClient } from "infrastructure/interfaces/strapi";
import { Doc } from "value-objects/doc";
import { Locale } from "value-objects/locale";
import { Markdown } from "value-objects/markdown/markdown";

export class StrapiVolunteerRepo implements VolunteerRepo {
  constructor(private readonly strapiClient: StrapiClient) {}

  async getAllVolunteers(locale: Locale): Promise<Volunteer[]> {
    const res = await this.strapiClient.sdk.GetVolunteers({
      locale: locale.value,
    });

    const volunteers: Volunteer[] = [];

    for (const resVolunteer of res.volunteers?.data || []) {
      if (!resVolunteer.id || !resVolunteer.attributes) {
        continue;
      }

      const { locale, activity, org, start, end, url, info, doc } =
        resVolunteer.attributes;

      if (!locale) {
        throw new InvalidLocalizedEntityError();
      }

      volunteers.push(
        new Volunteer(
          resVolunteer.id,
          new Locale(locale),
          activity,
          org,
          start,
          end,
          url ? new URL(url) : undefined,
          info ? new Markdown(info) : undefined,
          doc?.data?.attributes?.url
            ? new Doc(new URL(doc.data.attributes.url))
            : undefined
        )
      );
    }

    return volunteers;
  }
}
