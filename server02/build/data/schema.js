'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeDefs = '\ntype Author {\n  # Auth0r of the movie.\n  id: Int\n  firstName: String\n  lastName: String\n  posts: [Post]\n}\ntype Post {\n  id: Int\n  title: String\n  text: String\n  views: Int\n  author: Author\n}\ntype Query {\n  author(firstName: String, lastName: String): Author\n  getFortuneCookie: String\n}\n';

var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: _resolvers2.default });

exports.default = schema;
//# sourceMappingURL=schema.js.map