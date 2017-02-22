$(document).on('click', '.js-popupForm', function(e){
	e.preventDefault();
    $('.popup-feedback-form').addClass('open');
});

$(document).on('click', '.js-submitForm, .js-submit', function(e){
    var that = this;
    $.get({
        url : '/feedback-answer.html',
        success: function(data){
            $('.popup-feedback-answer .form-wrapper').html(data);
            $('.popup-feedback-answer').addClass('open');
            if ($('.popup-feedback-form').hasClass('open')){
                $('.popup-feedback-form').removeClass('open');
            }
        },
        error: function(){

        }
    });
});

$(document).on('click', '.js-close', function(e){
    e.preventDefault();
    $('.popup').removeClass('open');
});

$(document).on('click', '.js-popup', function(e){
    var $this = $(e.currentTarget);
    var popup = $('.popup-carousel');
    popup.find('.js-slick_carousel.slick-initialized').slick('unslick');
    popup.find('.js-slick_carousel').empty();
    var imgList = $this.closest('.img-list-popup').find('.carousel-item');
    var imgSourceList = [];
    $.each(imgList, function(i, val){
        // imgSourceList.push(val.dataset.source);
        popup.find('.js-slick_carousel').append('<div class="img-wrapper"><img src="' + val.dataset.source + '"></div>');
    });

    popup.find('.js-slick_carousel').slick({
        adaptiveHeight : true,
        mobileFirst : true,
        prevArrow : '<a class="slick-prev"></a>',
        nextArrow : '<a class="slick-next"></a>',
        initialSlide : $this.data('index'),
        rows : 1,
        slidesPerRow : 1,
        slidesToShow : 1,
        slidesToScroll : 1,
    });
    popup.addClass('open');


    console.log(imgSourceList);
});