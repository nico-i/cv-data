import {
  getSdk,
  type Requester,
  type Sdk,
} from "@/infrastructure/interfaces/strapi/__generated__/strapi-sdk";
import type { DocumentNode } from "graphql";

export class StrapiClient {
  private readonly strapiUrl: string;
  private readonly strapiApiToken: string;
  public readonly sdk: Sdk;

  constructor(
    strapiUrl: string | undefined = process.env.STRAPI_URL,
    strapiApiToken: string | undefined = process.env.STRAPI_API_TOKEN,
    requester?: Requester
  ) {
    if (!strapiUrl) {
      throw new Error("CMS URL is not defined");
    }
    if (!strapiApiToken) {
      throw new Error("API token is not defined");
    }
    this.strapiUrl = strapiUrl;
    this.strapiApiToken = strapiApiToken;
    let sdkRequester: Requester;

    if (requester) {
      sdkRequester = requester;
    } else {
      sdkRequester = async <R, V>(
        doc: DocumentNode,
        variables: V
      ): Promise<R> => {
        const response = await fetch(`${this.strapiUrl}/graphql`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${this.strapiApiToken}`,
          },
          body: JSON.stringify({
            query: doc.loc?.source.body,
            variables,
          }),
        });

        const json = await response.json();
        if (typeof json !== "object") {
          throw new Error("Invalid JSON response");
        }

        if (json === null) {
          throw new Error("Response is null");
        }

        if (!("data" in json)) {
          throw new Error("No data in response");
        }

        if (
          "errors" in json &&
          json.errors &&
          Array.isArray(json.errors) &&
          json.errors.length > 0
        ) {
          throw new Error(json.errors[0].message);
        }
        return json.data as R;
      };
    }

    this.sdk = getSdk(sdkRequester);
  }
}
