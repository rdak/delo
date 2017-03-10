$(document).on('blur', '.feedback input', function(e){
    var $this = $(e.currentTarget);
    if ($this.val() == ''){
        $this.removeClass('not-empty');
    }
    else{
        $this.addClass('not-empty');
    }
});

$(document).on('click', '.js-popupForm', function(e){
	e.preventDefault();
    $('.popup-feedback-form .form-wrapper').removeClass('hide');
    $('.popup-feedback-form .message').addClass('hide');
    $('.popup-feedback-form').addClass('open');
});

$(document).on('click', '.js-submitForm, .js-submit', function(e){
    var that = this;
    e.preventDefault();
    // validation on server : add 'error' to field-wrapper + errormessage;
    // .field_reuired each
    var $form = $(e.delegateTarget);
    var name = $form.find('.field_name').val();
    var email = $form.find('.field_email').val();

    if(!name.length){
        $form.find('.field_name').parent().addClass('error');
        $form.find('.field_name').parent().find('.errorMessage').tooltip({
            title : 'Заполните это поле',
            placement : 'bottom',
            delay : {
                hide: 40000
            }
        });
    }
    else {
        $form.find('.field_name').parent().removeClass('error');
    }

    if(!email.length){
        $form.find('.field_email').parent().addClass('error');
        $form.find('.field_email').parent().find('.errorMessage').tooltip({
            title : 'Заполните это поле',
            placement : 'bottom',
            delay : {
                hide : 4000
            }
        });
    }
    else {
        $form.find('.field_email').parent().removeClass('error');
    }

    if (name.length>0 && email.length>0){
        $.get({
            url : '/templates/feedback-answer.html',
            success: function(data){
                $('.popup-feedback-form .form-wrapper').addClass('hide');
                $('.popup-feedback-form .message').removeClass('hide').html(data);
                $('.popup-feedback-form').addClass('open');
            },
            error: function(){

            }
        });
    }
});

$(document).on('click', '.js-close', function(e){
    e.preventDefault();
    $('.popup').removeClass('open');
});

$(document).on('click', '.img-list-popup .js-popup', function(e){
    var $this = $(e.currentTarget);
    if ($(window).width() < 768){

    }
    else{
        if ($this.closest('.img-list-popup').length){
            var popup = $('.popup-carousel');
                popup.find('.js-slick_carousel.slick-initialized').slick('unslick');
                popup.find('.js-slick_carousel').empty();
            var imgList = $this.closest('.img-list-popup').find('.carousel-item');
            var imgSourceList = [];
            $.each(imgList, function(i, val){
                popup.find('.js-slick_carousel').append('<div class="img-wrapper"><img src="' + val.dataset.source + '"></div>');
            });

            popup.find('.js-slick_carousel').slick({
                // adaptiveHeight : true,
                mobileFirst : true,
                prevArrow : '<a href="#" class="slick-prev"></a>',
                nextArrow : '<a href="#" class="slick-next"></a>',
                initialSlide : $this.data('index'),
                rows : 1,
                slidesPerRow : 1,
                slidesToShow : 1,
                slidesToScroll : 1,
            });
            popup.addClass('open');
        }
        else {

        }
    }
});

