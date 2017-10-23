import { createApolloFetch } from 'apollo-fetch'
import { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } from 'graphql-tools'

async function makeMergedSchema () {
  const logger = {log: (e) => console.log(e)}
  const fetcherHello = createApolloFetch({uri: 'http://127.0.0.1:3001/graphql'})
  const schemaHello = await introspectSchema(fetcherHello)
  const ExceutableSchemaHello = await makeRemoteExecutableSchema({
    schema: schemaHello,
    fetcher: fetcherHello,
    logger
  })

  const fetcherPerson = createApolloFetch({uri: 'http://127.0.0.1:3003/graphql'})
  const schemaPerson = await introspectSchema(fetcherPerson)
  const ExceutableSchemaPerson = await makeRemoteExecutableSchema({
    schema: schemaPerson,
    fetcher: fetcherPerson,
    logger
  })

  // A small string schema extensions to add links between schemas
  const LinkSchema = `
    extend type Person {
    
      hello: String
    }
  `

  return mergeSchemas({
    schemas: [ExceutableSchemaHello, ExceutableSchemaPerson, LinkSchema],
    resolvers: mergeInfo => ({
      Person: {
        hello:{
          fragment: 'fragment helloFragment on Person { name }',
          resolve(parent, args, context, info) {
            console.dir(parent)
            console.dir(args)
            console.dir(context)
            console.dir(info)
            return mergeInfo.delegate(
              'query',
              'hello',
              {
                what: parent.name
              },
              context,
              info,
            )
          }
        }
      },
      hello {
        Perspoo>:
      }
    })
  })
}



export default makeMergedSchema()
