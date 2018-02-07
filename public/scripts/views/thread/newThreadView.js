'use strict';

(function(module) {
  const newThreadView = {};

  newThreadView.init = function(ctx, next) {

    next();
  }

  module.newThreadView = newThreadView;
})(app);