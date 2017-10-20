import { HttpLink, createHttpLink } from 'apollo-link-http'
import fetch from 'node-fetch'
import { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } from 'graphql-tools'

async function makeMergedSchema () {


  console.log('.')
  const linkHello = createHttpLink({uri: 'http://localhost:3003/graphql', fetch})
  const schemaHello = await introspectSchema(linkHello)
  console.log('.')
  const linkPerson = new HttpLink({uri: 'http://localhost:3000/graphql', fetch})
  const schemaPerson = await introspectSchema(linkPerson)
  console.log('.')

  const LinkSchema = `
    extend type Person {
      hello: String
    }
    `

  const executableHello = makeRemoteExecutableSchema({
    schema: schemaHello,
    link: linkHello,
  })

  const executablePerson = makeRemoteExecutableSchema({
    schema: schemaPerson,
    link: linkPerson,
  })

  return mergeSchemas({
    schemas: [executableHello, executablePerson, LinkSchema],
    resolvers: mergeInfo => ({
      Person: {
        hello: {
          resolve(parent, args, context, info) {
            return mergeInfo.delegate(
              'query',
              'hello',
              {
                what: args.what,
              },
              context,
              info,
            )
          }
        }
      }
    })
  })
}

export const schema = makeMergedSchema()