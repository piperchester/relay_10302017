// Top-level GQL file
import { GraphQLSchema } from 'graphql';

// We need 2 endpoints: query and muatation
import { query } from './types/query-type';
import { mutation } from './types/mutation-type';

export const schema = new GraphQLSchema({
  query,
  mutation
});
