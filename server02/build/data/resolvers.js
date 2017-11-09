"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var resolvers = {
  Query: {
    hello: function hello(__, _ref) {
      var what = _ref.what;

      console.log(arguments);
      return what + " :)";
    }
  }
};

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map