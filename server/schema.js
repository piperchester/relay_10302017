// Top-level GQL file
// We need 2 endpoints: query and muatation


import { GraphQLSchema } from 'graphql';

import { query } from './types/query-type';

export const schema = new GraphQLSchema({
  query,
});
