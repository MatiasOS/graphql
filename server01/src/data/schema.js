import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
type Query {
  hello(what: String): String
}
`

const schema = makeExecutableSchema({typeDefs, resolvers})

export default schema
