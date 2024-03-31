export class Image {
  constructor(
    public readonly url: InstanceType<typeof URL>,
    public readonly alt: string,
    public readonly width: number,
    public readonly height: number
  ) {}
}
