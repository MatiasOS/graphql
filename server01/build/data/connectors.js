'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FortuneCookie = exports.View = exports.Post = exports.Author = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _casual = require('casual');

var _casual2 = _interopRequireDefault(_casual);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = new _sequelize2.default('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite'
});

var AuthorModel = db.define('author', {
  firstName: { type: _sequelize2.default.STRING },
  lastName: { type: _sequelize2.default.STRING }
});

var PostModel = db.define('post', {
  title: { type: _sequelize2.default.STRING },
  text: { type: _sequelize2.default.STRING }
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// create mock data with a seed, so we always get the same
_casual2.default.seed(123);
db.sync({ force: true }).then(function () {
  _lodash2.default.times(10, function () {
    return AuthorModel.create({
      firstName: _casual2.default.first_name,
      lastName: _casual2.default.last_name
    }).then(function (author) {
      return author.createPost({
        title: 'A post by ' + author.firstName,
        text: _casual2.default.sentences(3)
      });
    });
  });
});

var Author = db.models.author;
var Post = db.models.post;

// somewhere in the middle:
var mongo = _mongoose2.default.connect('mongodb://mongo/views');

var ViewSchema = _mongoose2.default.Schema({
  postId: Number,
  views: Number
});

var View = _mongoose2.default.model('views', ViewSchema);

_casual2.default.seed(123);
db.sync({ force: true }).then(function () {
  _lodash2.default.times(10, function () {
    return AuthorModel.create({
      firstName: _casual2.default.first_name,
      lastName: _casual2.default.last_name
    }).then(function (author) {
      return author.createPost({
        title: 'A post by ' + author.firstName,
        text: _casual2.default.sentences(3)
      }).then(function (post) {
        // <- the new part starts here
        // create some View mocks
        return View.update({ postId: post.id }, { views: _casual2.default.integer(0, 100) }, { upsert: true });
      });
    });
  });
});

var FortuneCookie = {
  getOne: function getOne() {
    return (0, _nodeFetch2.default)('http://fortunecookieapi.herokuapp.com/v1/cookie').then(function (res) {
      return res.json();
    }).then(function (res) {
      return res[0].fortune.message;
    });
  }
};

exports.Author = Author;
exports.Post = Post;
exports.View = View;
exports.FortuneCookie = FortuneCookie;
//# sourceMappingURL=connectors.js.map