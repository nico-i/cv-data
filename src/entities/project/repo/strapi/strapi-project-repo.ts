import { InvalidLocalizedEntityError } from "@/entities/entity";
import { Project } from "@/entities/project";
import {
  InvalidProjectLinkIconError,
  type ProjectRepo,
} from "@/entities/project/repo/project-repo";
import { Skill } from "@/entities/skill";
import type { StrapiClient } from "@/infrastructure/interfaces/strapi";
import { Image } from "@/value-objects/image";
import { Link } from "@/value-objects/link";
import { Locale } from "@/value-objects/locale";
import { Markdown } from "@/value-objects/markdown/markdown";
import { Svg } from "@/value-objects/svg";

export class StrapiProjectRepo implements ProjectRepo {
  constructor(private readonly strapiClient: StrapiClient) {}

  async getAllProjects(locale: Locale): Promise<Project[]> {
    const res = await this.strapiClient.sdk.GetProjects({
      locale: locale.value,
    });

    const projects: Project[] = [];

    for (const resProject of res.projects?.data || []) {
      if (!resProject.id || !resProject.attributes) {
        continue;
      }

      const {
        locale,
        title,
        slug,
        start,
        end,
        tldr,
        summary,
        work_hours,
        demo_url,
        header_image,
        links,
        technologies,
      } = resProject.attributes;

      if (!locale) {
        throw new InvalidLocalizedEntityError();
      }

      let headerImage: Image | undefined = undefined;
      if (header_image?.data?.attributes) {
        const { width, height, url, alternativeText } =
          header_image.data.attributes;
        if (!width || !height || !url || !alternativeText)
          throw new Error("Invalid header image data");

        headerImage = new Image(new URL(url), alternativeText, width, height);
      }

      const projectLinks: Link[] = [];
      if (links) {
        for (const resLink of links) {
          if (!resLink) {
            continue;
          }

          const { text, url, icon } = resLink;

          if (icon) {
            if (!icon.data?.attributes?.url) {
              throw new InvalidProjectLinkIconError("Icon URL is missing");
            }
            projectLinks.push(
              new Link(
                new URL(url),
                text,
                new Svg(new URL(icon.data?.attributes?.url))
              )
            );
          } else {
            projectLinks.push(new Link(new URL(url), text));
          }
        }
      }

      const projectTech: Skill[] = [];

      for (const resTech of technologies?.data || []) {
        if (!resTech.id || !resTech.attributes) {
          continue;
        }

        const { locale, proficiency, name, url, summary, svg } =
          resTech.attributes;

        if (!locale) {
          throw new InvalidLocalizedEntityError();
        }

        projectTech.push(
          new Skill(
            resTech.id,
            new Locale(locale),
            name,
            proficiency,
            new Markdown(summary),
            new URL(url),
            svg?.data?.attributes?.url
              ? new Svg(new URL(svg.data.attributes.url))
              : undefined
          )
        );
      }

      projects.push(
        new Project(
          resProject.id,
          new Locale(locale),
          title,
          slug,
          start,
          tldr,
          end,
          headerImage,
          work_hours || undefined,
          summary ? new Markdown(summary) : undefined,
          demo_url ? new URL(demo_url) : undefined,
          projectLinks.length > 0 ? projectLinks : undefined,
          projectTech
        )
      );
    }
    return projects;
  }
}
