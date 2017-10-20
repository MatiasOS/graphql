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

const db = new _sequelize2.default('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite'
});

const AuthorModel = db.define('author', {
  firstName: { type: _sequelize2.default.STRING },
  lastName: { type: _sequelize2.default.STRING }
});

const PostModel = db.define('post', {
  title: { type: _sequelize2.default.STRING },
  text: { type: _sequelize2.default.STRING }
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// create mock data with a seed, so we always get the same
_casual2.default.seed(123);
db.sync({ force: true }).then(() => {
  _lodash2.default.times(10, () => {
    return AuthorModel.create({
      firstName: _casual2.default.first_name,
      lastName: _casual2.default.last_name
    }).then(author => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: _casual2.default.sentences(3)
      });
    });
  });
});

const Author = db.models.author;
const Post = db.models.post;

// somewhere in the middle:
const mongo = _mongoose2.default.connect('mongodb://127.0.0.1:27017/views');

const ViewSchema = _mongoose2.default.Schema({
  postId: Number,
  views: Number
});

const View = _mongoose2.default.model('views', ViewSchema);

_casual2.default.seed(123);
db.sync({ force: true }).then(() => {
  _lodash2.default.times(10, () => {
    return AuthorModel.create({
      firstName: _casual2.default.first_name,
      lastName: _casual2.default.last_name
    }).then(author => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: _casual2.default.sentences(3)
      }).then(post => {
        // <- the new part starts here
        // create some View mocks
        return View.update({ postId: post.id }, { views: _casual2.default.integer(0, 100) }, { upsert: true });
      });
    });
  });
});

const FortuneCookie = {
  getOne() {
    return (0, _nodeFetch2.default)('http://fortunecookieapi.herokuapp.com/v1/cookie').then(res => res.json()).then(res => {
      return res[0].fortune.message;
    });
  }
};

exports.Author = Author;
exports.Post = Post;
exports.View = View;
exports.FortuneCookie = FortuneCookie;
//# sourceMappingURL=connectors.js.map