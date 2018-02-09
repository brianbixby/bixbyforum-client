'use strict';

(function(module) {
  const userView = {};

  userView.init = function(ctx, next) {
    $('.userView').removeClass('hidden');
    next();
  }

  module.userView = userView;
})(app);