var colourList_service = [
	'#dbece5',
	'#d0e7f2',
	'#d5dadf',
	'#dcd8e4',
	'#d0eced',

	'#e9dce3',
	'#f4e8d2',
	'#d7e4f1',
	'#f1e1d7',
	'#f1e1d7',

	'#f0ecd3',
	'#f0d9d9',
	'#f1e1d7',
	'#f1e1d7',
];

var colourList_main = [
	'#dbece5',
    '#e1e8ec',
    '#e6e6e6'
];

// need modify this constuction and use smth else
// that related with server-side

$(document).on('click', 'a', function(e){
	var $this = $(e.currentTarget);
	var href = $this.attr('href');
	var pathname = $this.data('pathname');
	// var location = window.location.pathname;
	var mainSliderList = $('.main_slider .slider_list');
	var outerApp = false;
	if (href.indexOf('skype') !== -1 || href.indexOf('mailto') !== -1){
		outerApp = true;
	}
	if (!outerApp && mainSliderList.length > 0 && pathname == '/'){

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

		switch(href){
			case 'index':
				var bg_image_style = colourList_main[indexSlider];
				break;
			case 'service_list':
				var bg_image_style = colourList_service[indexSlider];
				break;
			case 'about' : 
				var mainslider = $this.data('mainslider');
				console.log(mainslider);
			default:
				var bg_image_style = '#fff';
				break;
		}

		$('#bs-navbar').collapse('hide');

		$.get({
	        url : '/templates/' + href + '-content.html',
	        success: function(data){
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
		            if (sliderList.length){
				        // $('body').addClass('slider_page');
				    }
				    else{
		            	$('body').removeClass('slider_page');
				    }

				    var body = document.body;
				    for (var i=0, l=body.classList.length; i<l; ++i) {
					    if(/page-/.test(body.classList[i])) {
					    	body.classList.remove(body.classList[i]);
					    }
					}

					body.classList.add("page-" + href);
				    
		            switch(href) {
		            	case 'index':
		            		initSlider(indexSlider);
		            		break;
		            	case 'service_list':
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
		            		init();
		            		break;
		            }
	        	});
	        },
	        error: function(){
	        	$.get({
		        	url : '/templates/404-content.html',
			        success : function(data){
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
	    });
	}
});

