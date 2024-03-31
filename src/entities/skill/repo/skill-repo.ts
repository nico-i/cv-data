import type { Skill } from "@/entities/skill";
import type { Locale } from "@/value-objects/locale";

export interface SkillRepo {
  getAllSkills(locale: Locale): Promise<Skill[]>;
}

export class InvalidSkillIconError extends Error {
  constructor(e: unknown) {
    super(`Invalid skill icon: ${e}`);
  }
}
