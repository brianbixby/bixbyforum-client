'use strict';

(function(module) {
  const threadView = {};

  threadView.init = function(ctx, next) {

    next();
  }

  module.threadView = threadView;
})(app);