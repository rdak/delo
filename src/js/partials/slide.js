$(document).ready(function(){
	var sliderList = $('.slider_list');
	var currentIndex = 1;
	var length = sliderList.find('.slider_bg_list .bg').length;
	var sliding = null;
    var hammertime = new Hammer(sliderList[0]);
        hammertime.on('swipe', function(event) {
        	console.log(event);
            var direction,
		    	deltaX = event.deltaX,
		    	deltaY = event.deltaY;
		    currentIndex = getIndex(currentIndex, direction, deltaX, deltaY);
            switchSlider(sliderList,currentIndex);
        });
    
   	sliderList.on('mousewheel', function(event) {
   		event.preventDefault();
   		if (sliding || $(window).height()<100) return;
	    sliding = true;
	    var direction,
	    	deltaX = event.deltaX,
	    	deltaY = event.deltaY;
	    currentIndex = getIndex(currentIndex, direction, deltaX, deltaY);
	    switchSlider(sliderList, currentIndex);
	    setTimeout(function(){sliding = false;}, 1000);
    });
});

var getIndex = function(currentIndex, direction, deltaX, deltaY){
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
    	if (currentIndex != length){
	    	currentIndex++;
    	}
    	else {
    		currentIndex = 1;
    	}
    }
    else {
    	if (currentIndex != 1){
	    	currentIndex--;
    	}
    	else {
    		currentIndex = length;
    	}
    }
	return currentIndex;
}

var switchSlider = function(el,index){
    el.find('.current').removeClass('current');
    el.find('.less').removeClass('less');
    el.find('.greater').removeClass('greater');
    var elements = [
    	'.slider_bg_list .bg:nth-of-type(' + index + ')',
    	'.slider_menu .slider_menu_item-wrapper:nth-of-type(' + index + ')',
    	'.slider_index_list .index_wrapper:nth-of-type(' + index + ')',
    	'.slider_title_list .title_wrapper:nth-of-type(' + index + ')',
    	'.slider_link_list .slider_link_wrapper:nth-of-type(' + index + ')',
    	'.slider_sign_list .slider_sign_wrapper:nth-of-type(' + index + ')'
    ];

    var less_elements = [
    	'.slider_bg_list .bg:lt(' + (index-1)  +')',
    	'.slider_menu .slider_menu_item-wrapper:lt(' + (index-1) + ')',
    	'.slider_index_list .index_wrapper:lt(' + (index-1) + ')',
    	'.slider_title_list .title_wrapper:lt(' + (index-1) + ')',
    	'.slider_link_list .slider_link_wrapper:lt(' + index + ')',
    	'.slider_sign_list .slider_sign_wrapper:lt(' + (index-1) + ')'
    ];

    var great_elements = [
    	'.slider_bg_list .bg:gt(' + (index-1) +')',
    	'.slider_menu .slider_menu_item-wrapper:gt(' + (index-1) + ')',
    	'.slider_index_list .index_wrapper:gt(' + (index-1) + ')',
    	'.slider_title_list .title_wrapper:gt(' + (index-1) + ')',
    	'.slider_link_list .slider_link_wrapper:gt(' + index + ')',
    	'.slider_sign_list .slider_sign_wrapper:gt(' + (index-1) + ')'
    ];
    
    el.find(less_elements.join(',')).addClass('less');
    el.find(great_elements.join(',')).addClass('greater');
    el.find(elements.join(',')).addClass('current');
};

// (function( $ ){
//     this.currentIndex = 1;

//     var methods = {
//         init : function( options ) {
//             this.currentElement = 1;
//             this.sliding = false;
//         },
//         setActiveElement : function( index ) {
//             if (this.sliding) return
//             return this.slide(index)
//         },
//         slide : function(){
//             var currentElement = this.currentElement;
//             var next = this.currentElement + 1;
//             var direction = (next - currentElement > 0 ? 'great' : 'less');
//             var that = this;

//             if (next == currentElement) {
//                 return (this.sliding = false);
//             }

//             this.sliding = true;
//             this.find('.current').removeClass('current');
//             this.find('.bg-img-' + this.next).addClass('current');
//         },
//         update : function( content ) {
//         }
//     };

//     $.fn.switchSlider = function(method) {
//         var settings = $.extend({}, defaults, method.options);

//         if ( methods[method] ) {
//             return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
//         } else if ( typeof method === 'object' || ! method ) {
//             return methods.init.apply( this, arguments );
//         } else {
//             $.error( 'Метод с именем ' +  method + ' не существует для jQuery.switchSlider' );
//         } 
//     };
// })( jQuery );
// 