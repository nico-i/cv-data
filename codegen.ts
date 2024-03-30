import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      [`${import.meta.env.STRAPI_URL}/graphql`]: {
        headers: {
          Authorization: `bearer ${import.meta.env.STRAPI_API_TOKEN}`,
        },
      },
    },
  ],
  documents: "src/**/strapi/graphql/*.graphql",
  generates: {
    "src/infrastructure/interfaces/strapi/__generated__/strapi-sdk.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-generic-sdk",
      ],
    },
  },
};
export default config;
