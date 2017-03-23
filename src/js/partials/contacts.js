// When the window has finished loading create our google map below
// google.maps.event.addDomListener(window, 'load', init);
// 

var file = [];
var loaded = [];
var head = document.getElementsByTagName('head')[0];

var fileOnLoad =
// Pass the arrays to your function
(function(file, loaded){ return function(){
  loaded.push(true);  
  if(file.length == loaded.length){
    init();
  }
}})(file, loaded);

function checkContacts(){
    if(window.google){
        init();
    }
    else{
        file[0] = document.createElement('script');
        file[0].src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDMbbTmpDYiqc1YaCqq0lHmKI8ARq3nCOM";
        file[0].onload = fileOnLoad;
        head.appendChild(file[0]);
    }
}


function init() {
    var mapOptions = {
        zoom: 17,
        center: new google.maps.LatLng(55.7770599,37.5853224),
        styles: [{"featureType":"all","elementType":"all","stylers":[{"hue":"#ff6800"},{"saturation":"20"},{"lightness":"-8"},{"gamma":"1.00"},{"weight":"1.12"}]}]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');
    if (!mapElement){
        return;
    }
    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(55.7770599,37.5853224),
        map: map,
        title: 'Snazzy!'
    });
}

function showRecommendation(){
    console.log('as');
    $('html, body').animate({
        scrollTop: $('#recommendation-block').offset().top - $('#header').height()
    }, 200);
}