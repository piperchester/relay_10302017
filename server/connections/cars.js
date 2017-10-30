// Creates a connection type, and an edge type
import { connectionDefinitions } from 'graphql-relay';
import { carType } from '../types/car-type';

export const {
  connectionType: carConnectionType,
  edgeType: carEdgeType
} = connectionDefinitions({
  name: 'Cars',
  nodeType: carType,
});