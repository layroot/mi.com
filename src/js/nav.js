import $ from './lib/jquery.js'
$(function() {
    $(window).on('scroll', function() {
        let top = $(document).scrollTop();
        if (top > 300) {
            $('.hide').attr('class', 'hide')
        }

    })


})