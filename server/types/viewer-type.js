import { GraphQLObjectType } from 'graphql';

// This is the unique Relay ID, or the index, that each node must have 
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { nodeInterface} from '../utils/node-definitions'; 
import { registerType } from '../utils/resolve-type'; 

import { widgetConnectionType } from '../connections/widgets';

// models
import { Widget } from '../models/graphql-models'; 
import { WidgetData } from '../models/widget-data'; 
import { Viewer } from '../models/graphql-models';

// creating the endpoint
export const viewerType = new GraphQLObjectType({
  
  name: 'Viewer',
  // optional
  description: 'User of the application',

  // data fields that the Viewer returns
  // globalIdField will set a Base 64 encoded index
  fields: () => ({
    id: globalIdField('Viewer'),
    widgets: {
      type: widgetConnectionType,
      description: 'Get all widgets',

      // to do pagination, going to have to pass args
      args: connectionArgs,

      // func to get the data
      // makes a call to our REST service to pull all widgets
      // and returns them to our GQL endpoint
      resolve: (_, args, { baseUrl }) => {
        
        // create the new endpoint 
        const widgetData = new WidgetData(baseUrl);

        // query all widgets
        return widgetData.all().then(widgets => {

          // transforms each widget to a new widget w/ shallow merged
          const widgetModels = widgets.map(w => Object.assign(new Widget(), w));

          // create a new connection object (TODO: edge?)
          return connectionFromArray(widgetModels, args);
        });
      }
    },
  }),

  interfaces: () => [ nodeInterface ],

});


// BAD PRACTICE: hardcoded port
// const widgetData = new WidgetData('http://localhost:3010');


registerType(Viewer, viewerType, id => {
  return Object.assign(new Viewer(), {
    id
  });
});

// // need to specify type we're creating as well as a lookup func
// registerType(Viewer, viewerType, id => {

//   // lookup the widget based on ID; then shallow merge it with a new Widget and return
//   return widgetData.one(id).then(
//     widget => Object.assign(new Widget(), widget)
//   );
// });