
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:8001/graphql",
  documents: "apps/web/src/schemas/**/*.ts",
  generates: {
    "apps/web/src/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
