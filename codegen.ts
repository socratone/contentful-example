import { CodegenConfig } from '@graphql-codegen/cli';
import * as dotenv from 'dotenv';

dotenv.config();

const URL = process.env.CONTENTFUL_CONTENT_DELIVERY_API as string;
const TOKEN = process.env
  .CONTENTFUL_CONTENT_DELIVERY_API_ACCESS_TOKEN as string;

// https://the-guild.dev/graphql/codegen/docs/guides/react-vue
const config: CodegenConfig = {
  schema: {
    [URL]: {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  },
  documents: ['**/*.tsx'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './generates/gql/': {
      preset: 'client',
    },
  },
};

export default config;
