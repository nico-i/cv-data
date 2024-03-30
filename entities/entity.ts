import type { Locale } from "value-objects/locale";

export class Entity {
  constructor(public readonly id: string) {}

  equals(entity: Entity): boolean {
    return entity.id === this.id;
  }
}

export class LocalizedEntity extends Entity {
  constructor(public readonly id: string, public readonly locale: Locale) {
    super(id);
  }
}

export class InvalidLocalizedEntityError extends Error {
  constructor() {
    super("localized entity must have a locale attribute");
  }
}
