import type { Project } from "entities/project";
import type { Locale } from "value-objects/locale";

export interface ProjectRepo {
  getAllProjects(locale: Locale): Promise<Project[]>;
}

export class InvalidProjectLinkIconError extends Error {
  constructor(e: unknown) {
    super(`Invalid project link icon: ${e}`);
  }
}
