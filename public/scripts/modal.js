'use strict';

$('.sign-up-moodal-toggle').on('click', function(e) {
  e.preventDefault();
  $('#sign-up-moodal').toggleClass('is-visible');
  $('.loginSignupForms').addClass('hidden');
  $('.modal-close').addClass('hidden');
  $('.removeEventListeners').off();
  $('.loginSignupForms')[0].reset();
  $('.signUpLoginButtons').on('click', function(e) {
    e.preventDefault();
    $(`#${$(this).data('modal')}`).toggleClass('is-visible');
    $('.modal-close').toggleClass('hidden');
    $(`#${$(this).data('form')}`).toggleClass('hidden').on('submit', eval($(this).data('submit')));
  });
});