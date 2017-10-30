import { GraphQLObjectType } from 'graphql';

// This is the unique Relay ID, or the index, that each node must have
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { nodeInterface} from '../utils/node-definitions';
import { registerType } from '../utils/resolve-type';

import { widgetConnectionType } from '../connections/widgets';
import { carConnectionType } from '../connections/cars';

// models
import { Widget } from '../models/graphql-models';
import { Viewer } from '../models/graphql-models';
import { Car } from '../models/graphql-models';

import { WidgetData } from '../models/widget-data';
import { CarData } from '../models/car-data';

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

      // func to get the data; calls REST service to pull widgets
      // and returns them to GQL endpoint
      resolve: (_, args, { baseUrl }) => {

        // TODO: check baseUrl if car or widget

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
    cars: {
      type: carConnectionType,
      description: 'Get all cars',

      // to do pagination, going to have to pass args
      args: connectionArgs,

      // func to get the data; calls REST service to pull widgets
      // and returns them to GQL endpoint
      resolve: (_, args, { baseUrl }) => {
        const carData = new CarData(baseUrl);

        // query all widgets
        return carData.all().then(cars => {

          // transforms each widget to a new widget w/ shallow merged
          const carModels = cars.map(c => Object.assign(new Car(), c));

          // create a new connection object (TODO: edge?)
          return connectionFromArray(carModels, args);
        });
      }
    }
}),
interfaces: () => [ nodeInterface ],
});

registerType(Viewer, viewerType, id => {
  return Object.assign(new Viewer(), {
    id
  });
});