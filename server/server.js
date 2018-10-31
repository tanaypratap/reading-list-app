const express = require('express')
const graphqlIHTTP = require('express-graphql')

const app = express()
const PORT = 3000

app.use('/graphql', graphqlIHTTP({
    
}))

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))