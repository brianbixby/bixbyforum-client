'use strict';

page('/', app.pageView.init, app.forumView.init);
// page('/*', app.errorView.init);
// page('/*/*', app.errorView.init);
// page('/*/*/*', app.errorView.init);

page();