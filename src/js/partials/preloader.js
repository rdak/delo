var current = 0,
    loaded = 0,
    activeCounter = false;

var images = [
    '/img/bg-images/bg-main.png',
    '/img/bg-images/bg-popup-blured.png',
    '/img/bg-images/bg01.png',
    '/img/bg-images/bg02.png',
    '/img/bg-images/bg03.png',
    '/img/bg-images/bg04.png',
    '/img/bg-images/bg05.png',
    '/img/bg-images/bg06.png',
    '/img/bg-images/bg07.png',
    '/img/bg-images/bg08.png',
    '/img/bg-images/bg09.png',
    '/img/bg-images/bg10.png',
    '/img/bg-images/bg11.png',
    '/img/bg-images/bg12.png',
    '/img/bg-images/bg13.png',
    '/img/bg-images/bg14.png',
];

$(document).ready(function() {
    preloadPictures(loadingCounter);
});

var loadingCounter = function(){
    if (activeCounter){
        return;
    }
    else {
        activeCounter = true;    
    }

    var intervalID = setInterval(
        function(){
            current++;
            var load = Math.round((loaded/images.length)*100);
            $('.preloader-page .loading_bar').css({width : current + '%'});
            $('.preloader-page .loading_sign').html(current);
            if (current == load){
                activeCounter = false;
                clearInterval(intervalID);
            }
            if (current == 100){
                setTimeout(function(){
                    $('.preloader-page').fadeOut();
                    $('#page-wrap').fadeIn();
                    var href = document.location.pathname;
                    var body = document.body;
                    if (href == "/"){
                        href = href + 'index';
                    }
                    else{
                        href = href.replace('.html', '');
                    }

                    href = href.replace('/', '');
                    var url = '/' + href;
                    
                    switch(href){
                        case 'index':
                            var bg_image_style = mainSlideInfo[0].bg_color;
                            break;
                        case 'servicelist':
                            var bg_image_style = serviceSlideInfo[0].bg_color;
                            var url = url + '/family';
                            break;
                        default:
                            var bg_image_style = '#fff';
                            break;
                    }

                    var state = {'page_id': href, indexSlider : 0, bg_image_style : bg_image_style};
                    var title = href;

                    history.pushState(state, title, url);

                    body.classList.add("page-" + href);

                    switch(href) {
                        case 'index':
                            initSlider(0);
                            break;
                        case 'servicelist':
                            initSlider(0);
                            break;
                        case 'blog':
                        case 'success':
                        case 'service_page':
                            articleListPageInit();
                            break;
                        case 'about' :
                            break;
                        case 'article' :
                            
                        case 'contacts' :
                            checkContacts();
                            break;
                    }
                }, 600);

            }
        }
    , 20);
};

var preloadPictures = function(callback) {
    var i,
        j;

    for (i = 0, j = images.length; i < j; i++) {
            $('<img />').attr('src', images[i]).appendTo('body').hide();
            var img = $('<img/>')[0];
            img.onerror,
            img.onabort,
            img.onload = function () {
                loaded++;
                callback();
            };

            img.src = images[i];
            $(img).html();
    }
};

