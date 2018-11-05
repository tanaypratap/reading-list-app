/**
 * @description main schema file for graphql
 */

const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList  } = graphql

/** Dummy Data for Books */
const books = [
  { name: "Name of the Wind", genre: "Fantasy", id: '1', authorId: '1' },
    { name: "The Final Empire", genre: "Fantasy", id: '2', authorId: '2'  },
    { name: "The Long Earth", genre: 'Sci-Fi', id: '3', authorId: '3' }
];


const authors = [
  { name: "Patrick Rothfuss", age: 44, id: "1" },
  { name: "Brandon Sanderson", age: 42, id: "2" },
  { name: "Terry Pratchett", age: 66, id: "3" }
];
/**
 * Book schema, this is more like defining a new type, a struct or interface
 */
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id})
            }
        }
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
            args: { id: { type: GraphQLID } }, /** User should pass the argument along, when there's a query for book */
            resolve: (parent, args) => {
                /**
                 * This gets the data from db or any other source
                 * @param args will have the `id` field as described above
                 */
                const { id } = args
                return _.find(books, { id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve: (parent, args) => {
                const { id } = args
                return _.find(authors, { id })
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