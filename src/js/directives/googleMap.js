angular.module('finalProject')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$state'];
function googleMap($window, $state) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      venues: '=',
      center: '='
    },
    link: function($scope, element) {

      const map = new $window.google.maps.Map(element[0], {
        center: {
          lat: 51.4428,
          lng: -0.1526
        },
        zoom: 11
      });

      if($scope.center && $scope.center.lat && $scope.center.lng) {
        const center = { lat: $scope.center.lat, lng: $scope.center.lng };
        map.setCenter(center);

        new $window.google.maps.Marker({
          position: center,
          map: map
        });
      }

      let markers = [];
      function clearMarkers() {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
      }

      $scope.$watch('venues.$resolved', () => {
        clearMarkers();
        if($scope.venues && $scope.venues.$resolved) {
          $scope.venues.forEach((venue) => {
            if(venue.lat && venue.lng) {
              const marker = new $window.google.maps.Marker({
                position: { lat: venue.lat, lng: venue.lng },
                map: map,
                animation: $window.google.maps.Animation.DROP,
                venue: venue
              });

              marker.addListener('click', () => {
                $state.go('venuesShow', { id: venue.id });
              });

              markers.push(marker);
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
