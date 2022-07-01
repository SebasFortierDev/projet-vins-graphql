require('dotenv').config()
const express = require('express');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./graphql/schema')
const root = require('./graphql/resolvers')

const port = process.env.PORT

const app = express()

app.use(helmet({ contentSecurityPolicy: (process.env.NODE_ENV === 'production') }))

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
