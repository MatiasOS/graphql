'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloFetch = require('apollo-fetch');

var uri = 'http://server02:3001/graphql';
var apolloFetch = (0, _apolloFetch.createApolloFetch)({ uri: uri });

var resolvers = {
  Query: {
    hello: function hello(__, _ref) {
      var what = _ref.what;

      return apolloFetch({ query: '{hello(what: "' + what + '")}' }).then(function (result) {
        var data = result.data,
            errors = result.errors,
            extensions = result.extensions;

        console.dir(result);
        return data.hello + '!';
      }).catch(function (error) {

        console.log('err');
        console.dir(error);
      });
    }
  }
};

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map