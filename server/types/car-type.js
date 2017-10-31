import { GraphQLObjectType, GraphQLString } from 'graphql';

// This is the unique Relay ID, or the index, that each node must have 
import { globalIdField, connectionArgs, connectionFromArray } from 'graphql-relay';

import { nodeInterface} from '../utils/node-definitions'; 
import { registerType } from '../utils/resolve-type'; 

import { widgetConnectionType } from '../connections/widgets';

import { Widget } from '../models/graphql-models'; 
import { CarData } from '../models/car-data'; 
import { Viewer } from '../models/graphql-models';

// creating the endpoint
export const carType = new GraphQLObjectType({
  
  name: 'Car',
  description: 'Car in the application.',
  fields: () => ({
    id: globalIdField('Car'),
    make: {
      type: GraphQLString,
    },
    model: {
      type: GraphQLString
    },
    year: {
      type: GraphQLString
    },
    color: {
      type: GraphQLString
    },    
    price: { 
      type: GraphQLString 
    }  
    // widgets: {
    //   type: widgetConnectionType,  // TODO: fix this?
    //   description: 'Get all cars',
    //   args: connectionArgs,      
    //   resolve: (_, args, { baseUrl }) => {
        
    //     // create the new endpoint 
    //     const carData = new CarData(baseUrl);

    //     // query all widgets
    //     return carData.all().then(cars => {

    //       // transforms each widget to a new widget w/ shallow merged
    //       // TODO: here...?
    //       const carModels = cars.map(w => Object.assign(new Widget(), w));

    //       // create a new connection object (TODO: edge?)
    //       return connectionFromArray(carModels, args);
    //     });
    //   }
    // },
  }),
  interfaces: () => [ nodeInterface ]
});

registerType(Viewer, carType, id => {
  return Object.assign(new Viewer(), {
    id
  });
});