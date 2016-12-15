angular.module('finalProject')
  .directive('googleplace', googleplace);
  // .directive('googleMap', googleMap);

googleplace.$inject = ['$window'];
function googleplace($window) {
  return {
    restrict: 'A',
    require: 'ngModel',
    scope: {
      venue: '=',
      user: '='
    },
    link: function($scope, element, attrs, model) {
      const options = {
        types: [],
        componentRestrictions: { country: 'GB' }
      };

      const autocomplete = new $window.google.maps.places.Autocomplete(element[0], options);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        const latLng = place.geometry.location.toJSON();

        $scope.user.lat = latLng.lat;
        $scope.user.lat = latLng.lng;

        $scope.venue.lat = latLng.lat;
        $scope.venue.lng = latLng.lng;
        $scope.venue.postcode = place.formatted_address;

        //
        // console.log($scope.user.lat);

        console.log(place);
        console.log(place.formatted_address);


        model.$setViewValue(element.val());
      });
    }
  };
}
