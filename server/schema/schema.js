/**
 * @description main schema file for graphql
 */

const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

/**
 * Book schema, this is more like defining a new type, a struct or interface
 */
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

/**
 * Root queries are the entry point for GraphQl
 */
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: BookType, /** This is a query for book */
        args: {
            id: { type: GraphQLString }, /** User should pass the argument along, when there's a query for book */
            resolve(parent, args) {
                /**
                 * This gets the data from db or any other source
                 * @param args will have the `id` field as described above
                 */
            }
        }
    }
})

/**
 * Declaring the schema and exporting it
 */
module.exports = new GraphQLSchema({ 
    query: RootQuery
})