import { remark } from "remark";
import remarkHTML from "remark-html";

export class Markdown {
  constructor(private readonly value: string) {}

  toHtml(): string {
    return remark().use(remarkHTML).processSync(this.value).toString();
  }
}
