
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql",
  documents: "src/**/*.graphql",
  generates: {
    "src/gql/generated/": {
      preset: "client",
      plugins: [],
      config: {
        useTypeImports: true
      },
    }
  }
};

export default config;
