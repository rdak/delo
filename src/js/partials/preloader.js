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
    var href = document.location.pathname;
    var body = document.body;
    if (href == "/"){
        href = href + 'index';
    }
    else{
        href = href.replace('.html', '');
    }
    href = href.replace('/', '');
    body.classList.add("page-" + href);
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
                    initSlider(0);
                }, 600);
            }
        }
    , 20);
};

var preloadPictures = function(callback) {
    var i,
        j;

    for (i = 0, j = images.length; i < j; i++) {
            // var img = new Image();
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

