import type { Cert } from "@/entities/cert";
import type { Locale } from "@/value-objects/locale";

export class InvalidCertDocError extends Error {
  constructor() {
    super("doc attribute must have a url attribute");
  }
}

export interface CertRepo {
  getAllCerts(locale: Locale): Promise<Cert[]>;
}
