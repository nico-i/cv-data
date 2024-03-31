import { InvalidLocalizedEntityError } from "@/entities/entity";
import { Info } from "@/entities/info";
import {
  InvalidInfoError,
  type InfoRepo,
} from "@/entities/info/repo/info-repo";
import type { StrapiClient } from "@/infrastructure/interfaces/strapi";
import { Image } from "@/value-objects/image";
import { Link } from "@/value-objects/link";
import { Locale } from "@/value-objects/locale";
import { Svg } from "@/value-objects/svg";

export class StrapiInfoRepo implements InfoRepo {
  constructor(private readonly strapiClient: StrapiClient) {}

  async getInfo(locale: Locale): Promise<Info> {
    const res = await this.strapiClient.sdk.GetInfo({ locale: locale.value });
    if (!res.info?.data?.id || !res.info?.data?.attributes) {
      throw new InvalidInfoError("id or attributes missing from response");
    }

    const {
      locale: infoLocale,
      portrait,
      address,
      occupation,
      name,
      phone,
      dob,
      bio,
      contact,
    } = res.info?.data?.attributes;

    if (!infoLocale) {
      throw new InvalidLocalizedEntityError();
    }

    const { width, url, alternativeText, height } =
      portrait.data?.attributes ?? {};

    if (!url || !alternativeText || !width || !height) {
      throw new InvalidInfoError("portrait data missing from response");
    }

    let contactLinks: Link[] = [];

    if (contact) {
      for (const resCLink of contact) {
        if (!resCLink) {
          continue;
        }
        const { url, icon, text } = resCLink;
        const iconUrl = icon?.data?.attributes?.url;
        if (iconUrl) {
          contactLinks.push(
            new Link(new URL(url), text, new Svg(new URL(iconUrl)))
          );
        }
      }
    }

    return new Info(
      res.info.data.id,
      new Locale(infoLocale),
      new Image(new URL(url), width, height, alternativeText),
      address,
      occupation,
      name,
      phone,
      dob,
      contactLinks ? contactLinks : undefined,
      bio ? bio : undefined
    );
  }
}
