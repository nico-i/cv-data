import type { Cert } from "@/entities/cert";
import type { Locale } from "@/value-objects/locale";

export interface CertRepo {
  getAllCerts(locale: Locale): Promise<Cert[]>;
}
