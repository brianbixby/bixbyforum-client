'use strict';

(function(module) {
  const subforumView = {};

  subforumView.init = function(ctx, next) {

    next();
  }

  module.subforumView = subforumView;
})(app);