'use strict';

(function(module) {
  const editUserView = {};

  editUserView.init = function(ctx, next) {

    next();
  }

  module.editUserView = editUserView;
})(app);