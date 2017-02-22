$(document).ready(function(){
	articleListPageInit();
});

function articleListPageInit(){
	$('.article_preview-lead_text').dotdotdot({
		watch : true,
	});
}