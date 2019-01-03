const graphql = require('graphql');
const { find } = require('lodash');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const users = [
  { id: '1', firstName: 'duy', age: 23 },
  { id: '2', firstName: 'ngoc', age: 20 }
]

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      async resolve(parentValue, args) {
        const response = await axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
        console.log("response ",response)
        return response.data;
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: { 
      type: CompanyType,
      async resolve(parentValue, args) {
        const response = await axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
        console.log("UserType ",parentValue)
        return response.data;
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        console.log("ROOTQUERY ",parentValue)
        const response = await axios.get(`http://localhost:3000/users/${args.id}`)
         return response.data;
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args) {
        console.log("ROOTQUERY ",parentValue)
        const response = await axios.get(`http://localhost:3000/companies/${args.id}`)
         return response.data;
      }
    },
  }
})
console.log("asdadaaaa")
const query = new GraphQLSchema({
  query: RootQuery
});
module.exports ={
  query
}