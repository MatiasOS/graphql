'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloFetch = require('apollo-fetch');

var uri = 'http://127.0.0.1:3001/graphql';
var apolloFetch = (0, _apolloFetch.createApolloFetch)({ uri: uri });

var resolvers = {
  Query: {
    hello: function hello(__, _ref) {
      var what = _ref.what;

      return apolloFetch({ query: '{hello(what: "' + what + '")}' }) //all apolloFetch arguments are optional
      .then(function (result) {
        var data = result.data,
            errors = result.errors,
            extensions = result.extensions;
        //GraphQL errors and extensions are optional

        console.dir(result);
        return data.hello + '!';
      }).catch(function (error) {
        //respond to a network error
        console.log('err');
        console.dir(error);
      });
    }
  }
};

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map