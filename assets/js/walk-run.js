  // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow;
      var marker
      var path = "";
      var coordArray = [];
      var trackBol;
      var interval;
      var coordPlusArray = ["latitude: 34.0364292, longitude: -118.327529}"];
      var outputDiv = document.getElementById('output');

      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:34.052235, lng:-118.243683},
          zoom: 9
        });
        infoWindow = new google.maps.InfoWindow;

        function setMarkerPosition(marker, position) {
          marker.setPosition(
              new google.maps.LatLng(
                  position.coords.latitude,
                  position.coords.longitude)
          );
        };
        function showLocation(position) {
            //stores the latitu
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var latLong = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
            var coords = {lat:lat, lng:lng};
            coordArray.push(coords);
            coordArray.forEach(function(i){
              if (i >0) 
                coordPlusArray.push(coordArray[i])
            });


            // alert("Latitude : " + latitude + " Longitude: " + longitude);
            setMarkerPosition(marker,position);
            console.log(lat);
            console.log(lng);

            $("#output").append(coordArray);
         };
         //for each set of coordinates, place them in path 
            //when a coordinate set is added, place a "|" before it
        // function makePath(){

        //   for (var i = 0; i < coordArray.length; i++) {
        //     if ( coordArray === coordArray)
        //       path += coordArray[i];
        //     else if ( i === 1 ){
        //       path += coordArray[i];
        //       console.log(path);
        //     }
        //     // else if (i < 25)
        //     // else if (i < 50)

        //     else{
        //       path += "\|"+coordArray[i], coordArray[i+1];
        //       console.log(path);
        //     }

        //   }
        // }
         
         function errorHandler(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         };

        $("#start").on("click", function(e){
          e.preventDefault();
          trackBol = true;
          // interval = window.setInterval(makePath, 10000);
          if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };  
            map.setCenter(pos);
            map.setZoom(14);
            var options = {
              enableHighAccuracy: true,
              timeout:Infinity,
              maximumAge:0
            };
            marker = new google.maps.Marker({
              position: pos,
              map: map,
              icon: "./assets/images/paw.png"
            });
            watchID = navigator.geolocation.watchPosition(showLocation, errorHandler, options);
              }, function() {
              handleLocationError(true, infoWindow, map.getCenter()); 
            });
        }            else {
          // Browser doesn't support Geolocation
          handleLocationError(true, infoWindow, map.getCenter());
        }
        });
        // Try HTML5 geolocation.
        // $("#stop").on(click, function(e){
        //   e.preventDefault();
        //   startBol = false;

        //   } 




      $("#stop").on("click", function(e){
        e.preventDefault();
        // clearInterval(interval);

      });
      
      // var bounds = new google.maps.LatLngBounds;
      //   var markersArray = [];


        // var destinationIcon = 'https://chart.googleapis.com/chart?' +
        //     'chst=d_map_pin_letter&chld=D|FF0000|000000';
        // var originIcon = 'https://chart.googleapis.com/chart?' +
        //     'chst=d_map_pin_letter&chld=O|FFFF00|000000';
        // var map = new google.maps.Map(document.getElementById('map'), {
        //   center: {lat: 55.53, lng: 9.4},
        //   zoom: 10
        // });
  //       var geocoder = new google.maps.Geocoder;
  //       interval = window.setInterval(distanceCalc, 5000);
  //       function distanceCalc(){
  //       if (coordArray.length > 2){
  //       var service = new google.maps.DistanceMatrixService;
  //       service.getDistanceMatrix({
  //         origins: [coordArray[0]],
  //         destinations: [coordPlusArray[0]],
  //         travelMode: 'WALKING',
  //         unitSystem: google.maps.UnitSystem.METRIC,
  //         avoidHighways: true,
  //         avoidTolls: true
  //       }, function (response, status) {
  //         if (status !== 'OK') {
  //           alert('Error was: ' + status);
  //         } else{
  //           var originList = response.originAddresses;
  //           var destinationList = response.destinationAddresses;
  //           outputDiv = document.getElementById('output');
  //           outputDiv.innerHTML = '';
  //           deleteMarkers(markersArray);

  //           var showGeocodedAddressOnMap = function(asDestination) {
  //             var icon = asDestination ? destinationIcon : originIcon;
  //             return function(results, status) {
  //               if (status === 'OK') {
  //                 map.fitBounds(bounds.extend(results[0].geometry.location));
  //                 markersArray.push(new google.maps.Marker({
  //                   map: map,
  //                   position: results[0].geometry.location,
  //                   icon: icon
  //                 }));
  //               } else {
  //                 alert('Geocode was not successful due to: ' + status);
  //               }
  //             };
  //           };

  //           for (var i = 0; i < originList.length; i++) {
  //             var results = response.rows[i].elements;
  //             geocoder.geocode({'address': originList[i]},
  //                 showGeocodedAddressOnMap(false));
  //             for (var j = 0; j < results.length; j++) {
  //               geocoder.geocode({'address': destinationList[j]},
  //                   showGeocodedAddressOnMap(true));
  //               outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
  //                   ': ' + results[j].distance.text + ' in ' +
  //                   results[j].duration.text + '<br>';
  //             }
  //           }
  //         }
  //       });
  //     }  
  //   };
  // };
        
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      };



