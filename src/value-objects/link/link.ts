import type { Svg } from "@/value-objects/svg";

export class Link {
  constructor(url: Link["url"], content: Svg);
  constructor(url: Link["url"], content: string);
  constructor(
    public readonly url: InstanceType<typeof URL>,
    public readonly content: string | Svg
  ) {}
}
