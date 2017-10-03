'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connectors = require('./connectors');

var resolvers = {
  Query: {
    author: function author(_, args) {
      return _connectors.Author.find({ where: args });
    },
    getFortuneCookie: function getFortuneCookie() {
      return _connectors.FortuneCookie.getOne();
    }
  },
  Author: {
    posts: function posts(author) {
      return author.getPosts();
    }
  },
  Post: {
    author: function author(post) {
      return post.getAuthor();
    },
    views: function views(post) {
      return _connectors.View.findOne({ postId: post.id }).then(function (view) {
        return view.views;
      });
    }
  }
};

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map