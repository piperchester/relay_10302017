import { nodeDefinitions } from 'graphql-relay';

import { getNode, getNodeType } from './resolve-type';

// nodeInterface
// nodeField: apply to types to say they implement the Relay ID
export const { nodeInterface, nodeField } = nodeDefinitions(getNode, getNodeType);
