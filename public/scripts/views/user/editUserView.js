'use strict';

(function(module) {
  const editUserView = {};

  editUserView.init = function(ctx, next) {
    $('.editUserView').removeClass('hidden');
    $('#updateProfileButton').on('click', function(e) {
      e.preventDefault();
      app.User.prototype.update();
    });
    $('#deleteProfileButton').on('click', app.User.prototype.delete);
    next();
  }

  module.editUserView = editUserView;
})(app);