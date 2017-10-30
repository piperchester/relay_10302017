import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { globalIdField } from 'graphql-relay'; 

// interfaces in GQL are just like Java interfaces
import { nodeInterface} from '../utils/node-definitions'; 
import { registerType } from '../utils/resolve-type'; 

import { Widget } from '../models/graphql-models'; 
import { WidgetData } from '../models/widget-data'; 

export const widgetType = new GraphQLObjectType({
  name: 'Widget',
  description: 'A single widget',
  fields: () => ({
    id: globalIdField('Widget'),
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString
    },
    color: {
      type: GraphQLString
    },
    size: { 
      type: GraphQLString 
    },
    quantity: {
      type: GraphQLInt
    }
  }),

  interfaces: () => [
    nodeInterface
  ],
});


// BAD PRACTICE: hardcoded port
const widgetData = new WidgetData('http://localhost:3010');

// need to specify type we're creating as well as a lookup func
registerType(Widget, widgetType, id => {
  // lookup the widget based on ID; then shallow merge it with a new Widget and return
  return widgetData.one(id).then(
    widget => Object.assign(new Widget(), widget)
  );
});