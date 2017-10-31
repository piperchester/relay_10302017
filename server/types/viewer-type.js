import { GraphQLObjectType } from 'graphql';
// This is the unique Relay ID, or the index, that each node must have
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { widgetConnectionType } from '../connections/widgets';
import { carConnectionType } from '../connections/cars';
import { WidgetData } from '../models/widget-data';
import { CarData } from '../models/car-data';
import { Widget, Viewer, Car } from '../models/graphql-models';
import { nodeInterface } from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

// creating the endpoint
export const viewerType = new GraphQLObjectType({

  name: 'Viewer',
  description: 'User of the application',

  // data fields that the Viewer returns		
 -  // globalIdField will set a Base 64 encoded index
  fields: () => ({
    id: globalIdField('Viewer'),
    widgets: {
      type: widgetConnectionType,
      description: 'get all of the widgets',

      // needed for pagination
      args: connectionArgs,

      // returns them to GQL endpoint
      resolve: (_, args, { baseUrl }) => {

        // create the new endpoint
        const widgetData = new WidgetData(baseUrl);
        return widgetData.all().then(widgets => {
          const widgetModels = widgets.map(w => Object.assign(new Widget(), w));
          const conn = connectionFromArray(widgetModels, args);
          conn.totalCount = widgetModels.length;
          return conn;
        });
      },
    },
    cars: {
      type: carConnectionType,
      description: 'get all of the cars',
      args: connectionArgs,
// func to get the data; calls REST service to pull widgets		
-      // and returns them to GQL endpoint      
      resolve: (_, args, { baseUrl }) => {
        const carData = new CarData(baseUrl);
        return carData.all().then(cars => {
          const carModels = cars.map(c => Object.assign(new Car(), c));

          // create a new connection object (TODO: edge?)
          return connectionFromArray(carModels, args);
        });
      },
    },
  }),

  interfaces: () => [ nodeInterface ],

});

registerType(Viewer, viewerType, id => {
  return Object.assign(new Viewer(), { id });
});