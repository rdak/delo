$(document).ready(function() {
    var images = [
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

    preloadPictures(images,
        function(){
            $('.preloader-page .loading_bar').css({width : '100%'});
            $('.preloader-page .loading_sign').html(99);
            $('.preloader-page').fadeOut();
            $('#page-wrap').fadeIn();
        },
        function(c){
            var round = Math.round(c*100);
            var current = $('.preloader-page .loading_sign');
            while(current<round){
                _.delay(function(cur){
                    current++;
                    $('.preloader-page .loading_bar').css({width : cur + '%'});
                    $('.preloader-page .loading_sign').html(cur);
                }, 100, cur);
            }
        }
    );
});

var preloadPictures = function(pictureUrls, callback, cb) {
    var i,
        j,
        loaded = 0;

    for (i = 0, j = pictureUrls.length; i < j; i++) {
        (function (img, src) {
            img.onload = function () {                               
                if (++loaded == pictureUrls.length && callback) {
                    _.defer(callback());
                }
                else {
                    _.defer(cb(loaded/pictureUrls.length));
                }
            };

            img.onerror = function () {
                if (++loaded == pictureUrls.length && callback) {
                    _.defer(callback());
                }
            };
            
            img.onabort = function () {
                if (++loaded == pictureUrls.length && callback) {
                    _.defer(callback());
                }
            };

            img.src = src;
        } (new Image(), pictureUrls[i]));
    }
};

