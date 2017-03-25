$(document).on('click', 'a', function(e){
	var $this = $(e.currentTarget);
	var href = $this.attr('href');
	var pathname = $this.data('pathname');
	
	var mainSliderList = $('.main_slider .slider_list');
	var outerApp = false;

	if (href.indexOf('skype') !== -1 || href.indexOf('mailto') !== -1 || this.hostname != location.hostname){
		outerApp = true;
	}

	if (!outerApp && mainSliderList.length > 0 && pathname){

	}
	else if (href && href!="#" && !outerApp){
		e.preventDefault();

		if (href == "/"){
			href = href + 'index';
		}
		else{
			href = href.replace('.html', '');
		}
		href = href.replace('/', '');

		if ($this.data('index')){
			var indexSlider = $this.data('index')-1;
		}
		else {
			var indexSlider = 0;
		}

		if ($this.data('mainslider')){
			var mainslider = $this.data('mainslider');
		}
		else{
    		var mainslider = null;
		}

		var url = '/' + href;

		switch(href){
			case 'index':
				var bg_image_style = mainSlideInfo[indexSlider].bg_color;
				url = mainSlideInfo[indexSlider].url;
				break;
			case 'servicelist':
				var bg_image_style = serviceSlideInfo[indexSlider].bg_color;
				url = serviceSlideInfo[indexSlider].url;
				break;
			default:
				var bg_image_style = '#fff';
				break;
		}

		var state = {
			page_id : href,
			indexSlider : indexSlider,
			bg_image_style : bg_image_style,
			mainslider : mainslider
		};

		var title = href;
		if (href != 'servicelist' && href !='index'){
			history.pushState(state, title, url);
		}

		$.get({
	        url : '/templates/' + href + '-content.html',
	        success: function(data){
	        	success(state, data);
	        },
	        error: error
	    });
	}
});

var lastUrl = window.location.pathname;

window.onpopstate = function(e){
    if(e.state){
		var href = e.state.page_id,
    		indexSlider = e.state.indexSlider;

    	href = href.replace('/', '');
debugger;
    	if (href == lastUrl){
    		switch(href) {
	        	case 'index':
		        	var sliderList = $('.slider_list');
	        		switchSlider(sliderList, indexSlider);
	        		break;
	        	case 'servicelist':
		        	var sliderList = $('.slider_list');
	        		switchSlider(sliderList, indexSlider);
	        		break;
	        	case 'blog':
	        	case 'success':
	        	case 'service_page':
	            	articleListPageInit();
	        		break;
	        	case 'about' :
	        		if (mainslider){
	        			showRecommendation();
	        		}
	        		break;
	        	case 'article' :
	        		
	        	case 'contacts' :
	        		checkContacts();
	        		break;
	        }
    	}
    	else{
	    	$.get({
		        url : '/templates/' + e.state.page_id + '-content.html',
		        success: function(data){
		        	success(e.state, data);
		        },
		        error: error
		    });
	    }
    }
};

function success(state, data){
	var href = state.page_id,
		indexSlider = state.indexSlider,
		bg_image_style = state.bg_image_style,
		mainslider = state.mainslider;

	lastUrl = href;

	$('#bs-navbar').collapse('hide');
	
	$('.line_loader').removeClass('hide').css('display', 'block');
	$('.line_loader').css({
		'width' : 0,
		'background' : bg_image_style
	});

	$('.line_loader').animate({
		'width': '100%',
	}, 600, function(){
    	$(window).scrollTop(0);
    	$('#page-content').removeClass('error-page');

        $('#page-content .content').html(data);

        $('.line_loader').fadeOut(500, function(){
            $('.line_loader').addClass('hide');
        });

        var sliderList = $('.slider_list');
        if (!sliderList.length){
        	$('body').removeClass('slider_page');
	    }

	    var body = document.body;
	    for (var i=0, l=body.classList.length; i<l; ++i) {
		    if(/page-/.test(body.classList[i])) {
		    	body.classList.remove(body.classList[i]);
		    }
		}

		href = href.replace('/', '');
		body.classList.add("page-" + href);

		switch(href) {
        	case 'index':
        		initSlider(indexSlider);
        		break;
        	case 'servicelist':
        		initSlider(indexSlider);
        		break;
        	case 'blog':
        	case 'success':
        	case 'service_page':
            	articleListPageInit();
        		break;
        	case 'about' :
        		if (mainslider){
        			showRecommendation();
        		}
        		break;
        	case 'article' :
        		
        	case 'contacts' :
        		checkContacts();
        		break;
        }
	});
}

function error(state, data){
	var href = state.page_id,
		indexSlider = state.indexSlider,
		bg_image_style = state.bg_image_style;

	$.get({
    	url : '/templates/404-content.html',
        success : function(data){
        	var state = { 'page_id': href };
			var title = href;
			var url = '/' + href;
			history.pushState(state, title, url);

        	$('.line_loader').removeClass('hide').css('display', 'block');
        	$('.line_loader').css({
        		'width' : 0,
        		'background' : '#fff'
        	});

        	$('.line_loader').addClass('error').animate({
        		'width' : '100%',
        	}, 600, function(){
	        	$(window).scrollTop(0);
        		$('#page-content').addClass('error-page');
	            $('#page-content .content').html(data);

	            $('.line_loader').fadeOut(500, function(){
		            $('.line_loader').addClass('hide');
	            });

	        	$('.line_loader').removeClass('error');
        	});
        }
    });
}