'use strict';

(function(module) {
  const userView = {};

  userView.init = function(ctx, next) {

    next();
  }

  module.userView = userView;
})(app);