import { GqlModuleOptions } from '@nestjs/graphql';

export const graphqlConfig: GqlModuleOptions = {
  autoSchemaFile: true,
  sortSchema: true,
  path: '/',
};
