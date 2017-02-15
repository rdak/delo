$(document).on('click', function(){
    $('.slider_link_list').on('click', '.js-popupForm',function(e){
    	$('.popup-feedback-form').addClass('open');
    });

    $('.js-submit').on('click', function(){
    	$.get({
    		url : '/feedback-answer.html',
    		success: function(data){
    			$('.form-wrapper').html(data);
    		},
    	})
    });
});