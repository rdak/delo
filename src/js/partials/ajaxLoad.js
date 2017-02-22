// need modify this constuction and use smth else
// depends a bit on server-side

$(document).on('click', 'a', function(e){
	var $this = $(e.currentTarget);
	var href = $this.attr('href');
	if (href && href!="#"){
		e.preventDefault();
		if (href == "/"){
			href = href + 'index';
		}
		else{
			href = href.replace('.html', '');
		}

		if (href == 'service_list'){
			if ($this.data('index')){
				var indexSlider = $this.data('index');
			}
			else {
				var indexSlider = 0;
			}
		}

		href = href.replace('/', '');

		$.get({
	        url : '/templates/' + href + '-content.html',
	        success: function(data){
	            $('#page-content').html(data);
	            
	            switch(href) {
	            	case 'index':
	            		initSlider(0);
	            		break;
	            	case 'service_list':
	            		initSlider(indexSlider);
	            		break;
	            	case 'article' :
		            	articleListPageInit();
	            		break;
	            	case 'contacts' :
	            		init();
	            		break;
	            }
	        },
	        error: function(){
	        }
	    });
	}
});