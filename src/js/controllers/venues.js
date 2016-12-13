angular.module('finalProject')
  .controller('VenuesIndexController', VenuesIndexController)
  .controller('VenuesShowController', VenuesShowController)
  .controller('VenuesNewController', VenuesNewController)
  .controller('VenuesEditController', VenuesEditController);


VenuesIndexController.$inject = ['Venue'];
function VenuesIndexController(Venue) {
  const venuesIndex = this;

  venuesIndex.all = Venue.query();
}

VenuesShowController.$inject = ['Venue', '$state'];
function VenuesShowController(Venue, $state) {
  const venuesShow = this;

  function deleteVenue() {
    venuesShow.venue.$remove(() => {
      $state.go('venuesIndex');
    });
  }

  venuesShow.delete = deleteVenue;

  venuesShow.venue = Venue.get({ id: $state.params.id });
}

VenuesNewController.$inject = ['Venue', '$state'];
function VenuesNewController(Venue, $state) {
  const venuesNew = this;

  venuesNew.game = {};

  function create() {
    Venue.save(venuesNew.venue, () => {
      $state.go('venuesIndex');
    });
  }
  venuesNew.create = create;
}

VenuesEditController.$inject = ['Venue', '$state'];
function VenuesEditController(Venue, $state) {
  const venuesEdit = this;

  venuesEdit.venue = Venue.get($state.params);

  function update() {
    venuesEdit.venue.$update(() => {
      $state.go('venuesShow', $state.params);
    });
  }
  this.update = update;
}
