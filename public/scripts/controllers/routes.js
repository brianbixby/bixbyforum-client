'use strict';

page('/', app.pageView.init, app.User.currentUserCheck, app.forumView.init);
page('/user/:username', app.pageView.init, app.User.currentUserCheck, app.userView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.renderCurrent);
page('/user/:username/edit', app.pageView.init, app.User.currentUserCheck, app.editUserView.init, app.User.prototype.fetch, app.User.loadCurrent, app.User.updateProfileTemplate);
// page('/*', app.errorView.init);
// page('/*/*', app.errorView.init);
// page('/*/*/*', app.errorView.init);

page();