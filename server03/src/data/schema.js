import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
type Person {
  id: Int
  name: String
}
 
type Query {
  person(id: String): Person
}
`

const schema = makeExecutableSchema({typeDefs, resolvers})

export default schema
