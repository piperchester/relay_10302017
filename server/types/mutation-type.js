
import { GraphQLObjectType } from 'graphql';

import { insertWidgetMutationType as insertWidget } from './insert-widget-mutation-type';
import { insertCarMutationType as insertCar } from './insert-car-mutation-type';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    insertCar,    
    insertWidget,
  }),
});