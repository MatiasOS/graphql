'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloFetch = require('apollo-fetch');

var _graphqlTools = require('graphql-tools');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _apolloLinkHttp = require('apollo-link-http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return (0, _graphqlTools.mergeSchemas)({
    schemas: [ExceutableSchemaHello, ExceutableSchemaPerson]
  });
}

exports.default = makeMergedSchema();
//# sourceMappingURL=schema.js.map