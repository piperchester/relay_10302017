// Creates a connection type, and an edge type
import { connectionDefinitions } from 'graphql-relay';

import { widgetType } from '../types/widget-type';

export const {
  connectionType: widgetConnectionType,
  edgeType: widgetEdgeType
} = connectionDefinitions({
  name: 'Widgets',
  nodeType: widgetType,
});