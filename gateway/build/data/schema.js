'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloFetch = require('apollo-fetch');

var _graphqlTools = require('graphql-tools');

async function makeMergedSchema() {
  const logger = { log: e => console.log(e) };
  const fetcherHello = (0, _apolloFetch.createApolloFetch)({ uri: 'http://127.0.0.1:3001/graphql' });
  const schemaHello = await (0, _graphqlTools.introspectSchema)(fetcherHello);
  const ExceutableSchemaHello = await (0, _graphqlTools.makeRemoteExecutableSchema)({
    schema: schemaHello,
    fetcher: fetcherHello,
    logger
  });

  const fetcherPerson = (0, _apolloFetch.createApolloFetch)({ uri: 'http://127.0.0.1:3003/graphql' });
  const schemaPerson = await (0, _graphqlTools.introspectSchema)(fetcherPerson);
  const ExceutableSchemaPerson = await (0, _graphqlTools.makeRemoteExecutableSchema)({
    schema: schemaPerson,
    fetcher: fetcherPerson,
    logger
  });

  // A small string schema extensions to add links between schemas
  const LinkSchema = `
    extend type Person {
    
      hello: String
    }
  `;

  return (0, _graphqlTools.mergeSchemas)({
    schemas: [ExceutableSchemaHello, ExceutableSchemaPerson, LinkSchema],
    resolvers: mergeInfo => ({
      Person: {
        hello: {
          fragment: 'fragment helloFragment on Person { name }',
          resolve(parent, args, context, info) {
            console.dir(parent);
            console.dir(args);
            console.dir(context);
            console.dir(info);
            return mergeInfo.delegate('query', 'hello', {
              what: parent.name
            }, context, info);
          }
        }
      }
    })
  });
}

exports.default = makeMergedSchema();
//# sourceMappingURL=schema.js.map