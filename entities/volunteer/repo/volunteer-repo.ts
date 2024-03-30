import type { Volunteer } from "entities/volunteer";
import type { Locale } from "value-objects/locale";

export interface VolunteerRepo {
  getAllVolunteers(locale: Locale): Promise<Volunteer[]>;
}
