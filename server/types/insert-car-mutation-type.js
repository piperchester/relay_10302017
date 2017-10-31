import { GraphQLStringType } from 'graphql';

import { mutationWithClientMutationId, offsetToCursor } from 'graphql-relay';

import { insertCarType } from './car-input-types';
import { viewerType } from './viewer-type';
import { carEdgeType } from '../connections/cars';

import { CarData } from '../models/car-data';
import { Viewer, Car } from '../models/graphql-models';


export const insertCarMutationType = mutationWithClientMutationId({
  name: 'InsertCar',
  inputFields: {
    car: { 
      type: insertCarType
    },
    // objects that we send to the server will need to be tagged with an ID
    // this will tie the client-side graph operation to the server-side data operation
    clientMutationId: {
      type: GraphQLStringType
    }
  },

  // mutate -> and produce the response data
  mutateAndGetPayload: ({ car },  {baseUrl }) => {
    const carData = new CarData(baseUrl);
    // merge props into the new car
    return carData.insert(car).then(car => Object.assign(new Car(), car));
  },

  outputFields: {
    viewer: {
      type: viewerType,
      resolve: () => Object.assign(new Viewer(), { id: 1 }),
    },
    carEdge: {
      type: carEdgeType,
      // outputs public viewer we're working with 
      resolve: (car, _, { baseUrl }) => {
        const carData = new CarData(baseUrl);
        return carData.all().then(cars => {
          const carIndex = cars.findIndex(c => c.id === car.id);
          return {
            cursor: offsetToCursor(carIndex),  // has to know where widget ended up in the actual collection
            node: car,
          };
        });
      }
    }
  },
});