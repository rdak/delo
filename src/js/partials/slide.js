var mainSlideInfo = [
    {
        url : '/index',
        href : '/index',
        bg_color : '#dbece5'
    },

    {
        url : '/services',
        href : '/index',
        bg_color : '#e1e8ec'
    },

    {
        url : '/reference',
        href : '/index',
        bg_color : '#e6e6e6'
    }
];

var serviceSlideInfo = [
    {
        url : '/servicelist/family',
        href : '/servicelist',
        bg_color : '#dbece5',
    },

    {
        url : '/servicelist/realty-registration',
        href : '/servicelist',
        bg_color : '#d0e7f2',
    },

    {
        url : '/servicelist/realty-disputes',
        href : '/servicelist',
        bg_color : '#d5dadf',
    },

    {
        url : '/servicelist/inheritance',
        href : '/servicelist',
        bg_color : '#dcd8e4',
    },

    {
        url : '/servicelist/documents',
        href : '/servicelist',
        bg_color : '#d0eced',
    },

    {
        url : '/servicelist/contracts',
        href : '/servicelist',
        bg_color : '#e9dce3',
    },

    {
        url : '/servicelist/consumer-protection',
        href : '/servicelist',
        bg_color : '#f4e8d2',
    },

    {
        url : '/servicelist/migration-disputes',
        href : '/servicelist',
        bg_color : '#d7e4f1',
    },

    {
        url : '/servicelist/debt-collection',
        href : '/servicelist',
        bg_color : '#f1e1d7',
    },

    {
        url : '/servicelist/arbitration',
        href : '/servicelist',
        bg_color : '#f1e1d7',
    },

    {
        url : '/servicelist/foreigners',
        href : '/servicelist',
        bg_color : '#f0ecd3',
    },

    {
        url : '/servicelist/labour-law',
        href : '/servicelist',
        bg_color : '#f0d9d9',
    },

    {
        url : '/servicelist/customer-service',
        href : '/servicelist',
        bg_color : '#f1e1d7',
    },

    {
        url : '/servicelist/legal-advice',
        href : '/servicelist',
        bg_color : '#f1e1d7',
    }
];

$(document).on('click', '.js-switchSlide', function(e){
    var $this = $(e.currentTarget);

    if ($this.closest('.slider_bg_list').length){
        var length = $this.closest('.slider_bg_list').find('.bg').length;
        var $thisIndex = Number($this.closest('.bg').data('index'));

        if ($this.hasClass('left')){
            var index = $thisIndex - 1;
        }
        else if ($this.hasClass('right')){
            var index = $thisIndex + 1;
        }

        if (index == 0){
            index = length;
        }
        else if(index == length + 1) {
            index = 0;
        }
    }
    else {
        var index = $(e.currentTarget).data('index');
    }

    var sliderList = $('.slider_list');
    var pathname = $this.data('pathname');
    var mainSliderList = $('.main_slider .slider_list');

    if (pathname == '/' && mainSliderList.length && sliderList.length > 0){
        e.preventDefault();
        initSlider(index-1);
    }
    else {
        if (sliderList.length > 0){
            e.preventDefault();
            initSlider(index-1);
        }
    }
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
            if (!sliding && Math.abs(deltaX) > Math.abs(deltaY)){
                sliding = true;
                currentIndex = getIndex(currentIndex, direction, deltaX, deltaY, length, 'swipe');
                switchSlider(sliderList, currentIndex);
                setTimeout(function(){ sliding = false; }, 1200);
            }
        });

    sliderList.on('mousewheel', function(event) {
        var direction,
            deltaX = event.deltaX,
            deltaY = event.deltaY;
        if (sliding || $(window).width()<768) {
        }
        else {
            if ($('.slider_list').outerHeight() + $('#header').height() > $(window).height()){
                if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100 && deltaY<0){
                    event.preventDefault();
                    sliding = true;
                    currentIndex = getIndex(currentIndex, direction, deltaX, deltaY, length, 'mousewheel');
                    
                    switchSlider(sliderList, currentIndex);
                    setTimeout(function(){ sliding = false; }, 1200);
                }
                else if ($(window).scrollTop() == 0 && deltaY>0){
                    event.preventDefault();
                    sliding = true;
                    currentIndex = getIndex(currentIndex, direction, deltaX, deltaY, length, 'mousewheel');
                    
                    switchSlider(sliderList, currentIndex);
                    setTimeout(function(){ sliding = false; }, 1200);
                }
            }
            else if ($(window).scrollTop() == 0 && deltaY>0){
                event.preventDefault();
                sliding = true;
                currentIndex = getIndex(currentIndex, direction, deltaX, deltaY, length, 'mousewheel');
                
                switchSlider(sliderList, currentIndex);
                setTimeout(function(){ sliding = false; }, 1200);
            }
            else {
                event.preventDefault();
                sliding = true;
                currentIndex = getIndex(currentIndex, direction, deltaX, deltaY, length, 'mousewheel');
                
                switchSlider(sliderList, currentIndex);
                setTimeout(function(){ sliding = false; }, 1200);
            }
        }
    });
};

var getIndex = function(currentIndex, direction, deltaX, deltaY, length, eventType){
    if (eventType == 'swipe'){
        if (deltaX<0){
            direction = 'plus';
        }
        else {
            direction = 'minus';
        }
    }
    else {
        if (deltaY<0){
            direction = 'plus';
        }
        else {
            direction = 'minus';
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
    
    el.find('.current').removeClass('current');
    el.find('.less').removeClass('less');
    el.find('.greater').removeClass('greater');
    
    el.find(less_elements.join(',')).addClass('less');
    el.find(elements.join(',')).addClass('current');
    el.find(great_elements.join(',')).addClass('greater');

    if (el.closest('.main_slider').length){
        var ssl_height = el.find('.slider_sign_list .slider_sign_wrapper.current').height() - 20;
        var stl_height = el.find('.slider_title_list .title_wrapper.current').height();
    }
    else {
        var ssl_height = el.find('.slider_sign_list .slider_sign_wrapper.current').height();
        var stl_height = el.find('.slider_title_list .title_wrapper.current').height();
    }

    el.find('.slider_title_list').height(stl_height);
    el.find('.slider_sign_list').height(ssl_height);
    el.find('.slider_link_list').height(el.find('.slider_link_list .slider_link_wrapper.current').height());

    if (el.data('slider') == 'servicelistslider'){
        var sliderInfo = serviceSlideInfo;
        var mainslider = null;
    }
    else if (el.data('slider') == 'mainslider'){
        var sliderInfo = mainSlideInfo;
        var mainslider = true;
    }

    var state = {
        page_id : sliderInfo[index].href,
        indexSlider : index,
        bg_image_style : sliderInfo[index].bg_color,
        mainslider : mainslider
    };

    var title = sliderInfo[index].href;
    var url = sliderInfo[index].url;

    history.pushState(state, title, url);
};
