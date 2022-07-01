const { buildSchema } = require('graphql')

let schema = buildSchema(`
    type Query {
        getVin(id: ID!): Vin
    }
    
    type Vin {
        id: ID!
        name: String!
        year: Int!
        grade: Int!
    }
    
    type Mutation {
        createVin(input: VinInput): Vin
        updateVin(id: ID!, input: VinInput): Vin
    }

    input VinInput {
        name: String!
        year: Int!
        grade: Int!
    }
`)

module.exports = schema
