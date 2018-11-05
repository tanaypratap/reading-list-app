/**
 * @description main schema file for graphql
 */

const graphql = require('graphql')
const _ = require('lodash')

const Book = require('../models/book.model')
const Author = require('../models/author.model')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList  } = graphql

/**
 * Book schema, this is more like defining a new type, a struct or interface
 */
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({ /** Function wrapping to execute it later, otherwise AuthortType will error out */
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, _){
               return  Author.findOne({ _id: parent.authorId })
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
            resolve(parent, _) {
                return Book.find({ authorId: parent.id })
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
            resolve: (_, args) => {
              return Book.findOne({ _id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve: (_, args) => {
               return Author.findOne({ _id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(_, args){
              return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(){
             return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args){
                let author = new Author({
                    ...args
                })
                return author.save()
            }
        },

        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(_, args) {
                let book = new Book({
                    ...args
                })
                return book.save()
            }
        }
    }
})

/**
 * Declaring the schema and exporting it
 */
module.exports = new GraphQLSchema({ 
    query: RootQuery,
    mutation: Mutation
})