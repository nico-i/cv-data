export class Image {
  constructor(
    public readonly url: InstanceType<typeof URL>,
    public readonly width: number,
    public readonly height: number,
    public readonly alt?: string
  ) {}
}
