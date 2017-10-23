'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var pepole = [{ name: 'Number 0' }, { name: 'Number 1' }, { name: 'Number 2' }, { name: 'Number 3' }, { name: 'Number 4' }, { name: 'John 5' }];

var resolvers = {
  Query: {
    person: function person(__, _ref) {
      var id = _ref.id;

      var p = pepole[id];
      return _extends({ id: id }, p);
    }
  }
};

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map