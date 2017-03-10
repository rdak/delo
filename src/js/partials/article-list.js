$(document).ready(function(){
	articleListPageInit();
});

var maxBlog = 12;
var maxSuccess = 12;
var loading_block = false;

function articleListPageInit(){
	$('.article-lead_text').dotdotdot({
		watch : true,
	});
}

$(document).on('scroll', checkArticles);

function checkArticles(e){
	var windowScroll = $(window).scrollTop();
	var $block = $('.articles_list-block');
	var $blog_list = $block.find('.article-list.blog_list');
	var $success_list = $block.find('.article-list.success_list');

	if ((windowScroll + $(window).height() + 50) >= $(document).height() && loading_block == false) {
		loading_block = true;
		if ($block.length){
			if ($blog_list.find('.article-item').length < maxBlog){
				$blog_list.append('<div class="row row_loader"> <div class="col-xs-12 text-center"> <div class="rotating-border"></div> </div> </div>');
				var url = '/templates/blog-list.html';
				if ($('.service-block').length){
					url = '/templates/blog-list-in-service.html';
				}
				$.get({
		            url : url,
		            success: function(data){
		            	loading_block = false;
		                $blog_list.find('.row_loader').remove();
		                $blog_list.find('.row').append(data);
		            },
		            error: function(){

		            }
		        });
			}

			if ($success_list.find('.article-item').length < maxSuccess){
				$success_list.append('<div class="row row_loader"> <div class="col-xs-12 text-center"> <div class="rotating-border"></div> </div> </div>');
				var url = '/templates/success-list.html';
				if ($('.service-block').length){
					url = '/templates/success-list-in-service.html';
				}
				$.get({
		            url : url,
		            success: function(data){
		            	loading_block = false;
		                $success_list.find('.row_loader').remove();
		                $success_list.find('.row').append(data);
		            },
		            error: function(){

		            }
		        });
			}
		}
	}
}
