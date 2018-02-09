'use strict';

(function(module) {
  const editUserView = {};

  editUserView.init = function(ctx, next) {
    $('.editUserView').removeClass('hidden');
    // $('#editProfileButton').on('click', app.User.prototype.update);
    $('#deleteProfileButton').on('click', app.User.prototype.delete);
    next();
  }

  module.editUserView = editUserView;
})(app);