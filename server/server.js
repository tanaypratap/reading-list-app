/**
 * @description main server file, runs express app and gives graphql as a middleware
 */

const express = require('express')
const graphqlIHTTP = require('express-graphql')

const PORT = 3000

const app = express()


app.use('/graphql', graphqlIHTTP({

}))

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))