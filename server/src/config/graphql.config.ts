import { GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

export const graphqlConfig: GqlModuleOptions = {
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  path: '/api',
};
