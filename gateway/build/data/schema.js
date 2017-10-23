'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _apolloLinkHttp = require('apollo-link-http');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _graphqlTools = require('graphql-tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function makeMergedSchema() {

  console.log('.');
  const linkHello = new _apolloLinkHttp.HttpLink({ uri: 'http://localhost:3003/graphql', fetch: _nodeFetch2.default });
  console.log('.');
  const schemaHello = await (0, _graphqlTools.introspectSchema)(linkHello);
  console.log('.');
  const linkPerson = new _apolloLinkHttp.HttpLink({ uri: 'http://localhost:3000/graphql', fetch: _nodeFetch2.default });
  const schemaPerson = await (0, _graphqlTools.introspectSchema)(linkPerson);
  console.log('.');

  const LinkSchema = `
    extend type Person {
      hello: String
    }
    `;

  const executableHello = (0, _graphqlTools.makeRemoteExecutableSchema)({
    schema: schemaHello,
    link: linkHello
  });

  const executablePerson = (0, _graphqlTools.makeRemoteExecutableSchema)({
    schema: schemaPerson,
    link: linkPerson
  });

  return (0, _graphqlTools.mergeSchemas)({
    schemas: [executableHello, executablePerson, LinkSchema],
    resolvers: mergeInfo => ({
      Person: {
        hello: {
          resolve(parent, args, context, info) {
            return mergeInfo.delegate('query', 'hello', {
              what: args.what
            }, context, info);
          }
        }
      }
    })
  });
}

const schema = exports.schema = makeMergedSchema();
//# sourceMappingURL=schema.js.map