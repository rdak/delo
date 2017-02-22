$(document).ready(function(){
    initSlider(0);
});

function initSlider(currentIndex){
    var sliderList = $('.slider_list');
    
    switchSlider(sliderList, currentIndex);

    var length = sliderList.find('.slider_bg_list .bg').length;
    var sliding = null;
    var hammertime = new Hammer(sliderList[0]);
        hammertime.on('swipe', function(event) {
            var direction,
                deltaX = event.deltaX,
                deltaY = event.deltaY;
            currentIndex = getIndex(currentIndex, direction, deltaX, deltaY, length);
            switchSlider(sliderList, currentIndex);
        });
    
    sliderList.on('mousewheel', function(event) {
        if (sliding || $(window).height()<100) {
            return false;
        }
        event.preventDefault();
        sliding = true;
        var direction,
            deltaX = event.deltaX,
            deltaY = event.deltaY;
        currentIndex = getIndex(currentIndex, direction, deltaX, deltaY, length);
        switchSlider(sliderList, currentIndex);
        setTimeout(function(){ sliding = false; }, 2000);
    });
};

var getIndex = function(currentIndex, direction, deltaX, deltaY, length){
    if (deltaX > 0 || deltaY < 0){
    	direction = 'plus';
    }
    else if (deltaX < 0 || deltaY > 0){
    	direction = 'minus';
    }
    else if (deltaX < 0 && deltaY < 0){
    	if (deltaX < deltaY){
    		direction = 'minus';
    	}
    	else{
    		direction = 'plus';
    	}
    }
    else if (deltaX > 0 && deltaY > 0){
    	if (deltaX < deltaY){
    		direction = 'minus';
    	}
    	else{
    		direction = 'plus';
    	}
    }
    
    if (direction == 'plus'){
    	if (currentIndex != length-1){
	    	currentIndex++;
    	}
    	else {
    		currentIndex = 0;
    	}
    }
    else {
    	if (currentIndex != 0){
	    	currentIndex--;
    	}
    	else {
    		currentIndex = length-1;
    	}
    }
	return currentIndex;
}

var switchSlider = function(el, index){
    el.find('.current').removeClass('current');
    el.find('.less').removeClass('less');
    el.find('.greater').removeClass('greater');

    var elements = [
    	'.slider_bg_list .bg:nth-of-type(' + (index+1) + ')',
    	'.slider_menu .slider_menu_item-wrapper:nth-of-type(' + (index+1) + ')',
    	'.slider_index_list .index_wrapper:nth-of-type(' + (index+1) + ')',
    	'.slider_title_list .title_wrapper:nth-of-type(' + (index+1) + ')',
    	'.slider_link_list .slider_link_wrapper:nth-of-type(' + (index+1) + ')',
    	'.slider_sign_list .slider_sign_wrapper:nth-of-type(' + (index+1) + ')'
    ];

    var less_elements = [
    	'.slider_bg_list .bg:lt(' + (index)  +')',
    	'.slider_menu .slider_menu_item-wrapper:lt(' + (index) + ')',
    	'.slider_index_list .index_wrapper:lt(' + (index) + ')',
    	'.slider_title_list .title_wrapper:lt(' + (index) + ')',
    	'.slider_link_list .slider_link_wrapper:lt(' + (index) + ')',
    	'.slider_sign_list .slider_sign_wrapper:lt(' + (index) + ')'
    ];

    var great_elements = [
    	'.slider_bg_list .bg:gt(' + (index) +')',
    	'.slider_menu .slider_menu_item-wrapper:gt(' + (index) + ')',
    	'.slider_index_list .index_wrapper:gt(' + (index) + ')',
    	'.slider_title_list .title_wrapper:gt(' + (index) + ')',
    	'.slider_link_list .slider_link_wrapper:gt(' + (index) + ')',
    	'.slider_sign_list .slider_sign_wrapper:gt(' + (index) + ')'
    ];
    
    el.find(less_elements.join(',')).addClass('less');
    el.find(elements.join(',')).addClass('current');
    el.find(great_elements.join(',')).addClass('greater');
};
