import type { Svg } from "@/value-objects/svg";

export class Link {
  constructor(
    public readonly url: InstanceType<typeof URL>,
    public readonly text: string,
    public readonly icon?: Svg
  ) {}
}
