angular.module('finalProject')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      venues: '='
    },
    link: function($scope, element) {

      const map = new $window.google.maps.Map(element[0], {
        center: {
          lat: 51.508530,
          lng: -0.076132
        },
        zoom: 11
      });
      let markers = [];
      function clearMarkers() {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
      }

      $scope.$watch('venues.$resolved', () => {
        clearMarkers();
        if($scope.venues.$resolved) {
          $scope.venues.forEach((venue) => {
            if(venue.lat && venue.lng) {
              const marker = new $window.google.maps.Marker({
                position: { lat: venue.lat, lng: venue.lng },
                map: map,
                animation: $window.google.maps.Animation.DROP
              });
              marker.addListener('click', () => {
                // infoWindow.open(map, marker);
                markers.push(marker);
              });
            }
          });
        }
      });

      // const contentString = '<h1>' </h1>;
      // const infoWindow = new $window.google.maps.InfoWindow({
      //   content: contentString
      // });
    }
  };
}
