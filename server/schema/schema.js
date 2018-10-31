/**
 * @description main schema file for graphql
 */

const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

/** Dummy Data for Books */
const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: '1' },
  { name: "The Final Empire", genre: "Fantasy", id: '2' },
  { name: "The Long Earth", genre: 'Sci-Fi', id: '3' }
];

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
        book: {
            type: BookType, /** This is a query for book */
            args: { id: { type: GraphQLString } }, /** User should pass the argument along, when there's a query for book */
            resolve: (parent, args) => {
                /**
                 * This gets the data from db or any other source
                 * @param args will have the `id` field as described above
                 */
                const { id } = args
                return _.find(books, { id })
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