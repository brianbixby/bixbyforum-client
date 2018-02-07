'use strict';

$('.sign-up-moodal-toggle').on('click', function(e) {
  e.preventDefault();
  $('#sign-up-moodal').toggleClass('is-visible');
});