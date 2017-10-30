// Define the endpoint for working w/ Relay

import { GraphQLObjectType, GraphQLString } from 'graphql';

import { nodeField } from '../utils/node-definitions';
import { viewerType } from './viewer-type';

import { Viewer } from '../models/graphql-models';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({

    // required for the Relay ID
    node: nodeField,
    viewer: {
      type: viewerType,
      resolve: () => {
        return Object.assign(new Viewer(), { id: 1 });
      }
    },
    // message: {
    //   type: GraphQLString,
    //   resolve: () => 'Hello World!',
    // }
  }),
});