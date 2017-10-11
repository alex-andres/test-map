// you can specify the default lat long
        var map,currentPositionMarker;

        function geo_success(position) {
            mapCenter = new google.maps.LatLng(34.052235,-118.243683),
            map;
        };
 
        // change the zoom if you want
        function initializeMap(){
            map = new google.maps.Map(document.getElementById('map_canvas'), {
               zoom: 18,
               center: mapCenter,
               mapTypeId: google.maps.MapTypeId.ROADMAP
             });
        };
 
        function locError(error) {
            // tell the user if the current position could not be located
            alert("The current position could not be found!");
        }:
 
        // current position of the user
        function setCurrentPosition(pos) {
            currentPositionMarker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(
                    pos.coords.latitude,
                    pos.coords.longitude
                ),
                title: "Current Position"
                icon: 'https://files.slack.com/files-tmb/T67BZGM6H-F7ETH8603-b9906a6fdd/paw_360.png'
            });
            map.panTo(new google.maps.LatLng(
                    pos.coords.latitude,
                    pos.coords.longitude
                ));
        };
 
        function displayAndWatch(position) {
         
            // set current position
            setCurrentPosition(position);
             
            // watch position
            watchCurrentPosition();
        };
 
        function watchCurrentPosition() {
            var positionTimer = navigator.geolocation.watchPosition(
                function (position) {
                    setMarkerPosition(
                        currentPositionMarker,
                        position
                    );
                });
        };
 
        function setMarkerPosition(marker, position) {
            marker.setPosition(
                new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude)
            );
        };
 
        function initLocationProcedure() {
            initializeMap();
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
            } else {
                // tell the user if a browser doesn't support this amazing API
                alert("Your browser does not support the Geolocation API!");
            }
        };
 
        // initialize with a little help of jQuery
        $(document).ready(function() {
            initLocationProcedure();
        });