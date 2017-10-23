import { createApolloFetch } from 'apollo-fetch'
import { introspectSchema, makeRemoteExecutableSchema, mergeSchemas } from 'graphql-tools'
import fetch from 'node-fetch'
import { HttpLink } from 'apollo-link-http'

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

  return mergeSchemas({
    schemas: [ExceutableSchemaHello, ExceutableSchemaPerson]
  })
}

export default makeMergedSchema()