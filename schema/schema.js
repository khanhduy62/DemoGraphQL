const graphql = require('graphql');
const { find } = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const users = [
  { id: '1', firstName: 'duy', age: 23 },
  { id: '2', firstName: 'ngoc', age: 20 }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        console.log("ROOTQUERY ",parentValue)
        return find(users, { id: args.id })
      }
    },
  }
})
console.log("asdadaaaa")
module.exports = new GraphQLSchema({
  query: RootQuery
});