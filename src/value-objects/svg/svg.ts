export class Svg {
  constructor(url: Svg["url"], html: string);
  constructor(url: Svg["url"]);
  constructor(
    private readonly url: InstanceType<typeof URL>,
    public readonly html?: string
  ) {}

  public async fetchHtml(): Promise<string> {
    if (this.html) {
      return this.html;
    }

    const res = await fetch(this.url.href);
    return res.text();
  }
}
