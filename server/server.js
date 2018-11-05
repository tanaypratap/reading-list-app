/**
 * @description main server file, runs express app and gives graphql as a middleware
 */

const express = require('express')
const graphqlIHTTP = require('express-graphql')
const mongoose = require('mongoose')
const env = require('dotenv')
const cors = require('cors')


const schema = require('./schema/schema')

env.load();

const app = express()

// allow cross-origin request
app.use(cors())

// connect to mLab DB
// need to put db string with your creds to run in .env file
mongoose.connect(process.env.MONGO_CONN_URL);
mongoose.connection.once('open', () => {
    console.log('Connection to mLab successful!')
})
app.use('/graphql', graphqlIHTTP({
    schema,
    graphiql: true
}))

app.listen(process.env.PORT, () => console.log(`Server is listening at port ${process.env.PORT}`))