'use strict';

// NAV
$('.hamburger').on('click', function(){
    $('.flipping').toggleClass('flip');
    $(this).toggleClass('open');
    $('#hamburgerToggle').slideToggle(500);
    $('nav').toggleClass('darkNav');
    $('.userContainer').toggleClass('slideOut');
});
$('#hamburgerToggle a').on('click', function() {
    $('.flipping').toggleClass('flip');
    $('.hamburger').toggleClass('open');
    $('#hamburgerToggle').slideToggle(500);
    $('nav').toggleClass('darkNav');
    $('.userContainer').toggleClass('slideOut');
});

// HIDE DROPDOWN WHEN YOU CLICK HOME
$('#logo').on('click', function() {
    if($('#hamburgerToggle').css('display')=='block') {
        $('.flipping').toggleClass('flip');
        $('.hamburger').toggleClass('open');
        $('#hamburgerToggle').slideToggle(500);
        $('nav').toggleClass('darkNav');
        $('.userContainer').toggleClass('slideOut');
    }
});