function parseAddress() {
    var address = document.getElementById("myForm").elements[0].value; 
    address = address.replace(/ /g, '+');
    address = address.replace(/,/g,"%2C");

    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address;

    fetchData(url);
}

function fetchData(url) {
    var lat;
    var lng;
    $.getJSON(url, function(data) {
        lat = parseFloat(data.results[0].geometry.location.lat);
        lng = parseFloat(data.results[0].geometry.location.lng);
        updateMap(lat, lng);
        getAntipode(lat, lng);

        document.getElementById("lat").innerHTML = "Latitude: " + lat;
        document.getElementById("lng").innerHTML = "Longitude: " + lng;
    });
}

function initMap() {
    var startpt= {lat: 42.878, lng: -97.381};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: startpt
    });

}

function updateMap(latitude, longitude) {
    var startpt= {lat: latitude, lng: longitude};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: startpt
    });
    var marker = new google.maps.Marker({
        position: startpt,
        map: map
    });
}

function getAntipode(latitude, longitude) {
    var lat = -(latitude);
    var lng = 180 - Math.abs(longitude);
    antipodeMap(lat, lng);
    document.getElementById("alat").innerHTML = "Antipode Latitude: " + lat;
    document.getElementById("alng").innerHTML = "Antipode Longitude: " + lng;
}

function antipodeMap(latitude, longitude) {
    var startpt= {lat: latitude, lng: longitude};

    var map = new google.maps.Map(document.getElementById('amap'), {
        zoom: 5,
        center: startpt
    });
    var marker = new google.maps.Marker({
        position: startpt,
        map: map
    });
}