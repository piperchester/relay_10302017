import { GraphQLInputObjectType, GraphQLString } from 'graphql';

// Note the difference between GQLInputObjectType and regular ObjectType
export const insertCarType = new GraphQLInputObjectType({
  name: 'InsertCar',
  fields: () => ({
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
  }),
});