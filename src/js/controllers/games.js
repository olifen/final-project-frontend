angular.module('finalProject')
  .controller('GamesIndexController', GamesIndexController)
  .controller('GamesShowController', GamesShowController)
  .controller('GamesNewController', GamesNewController)
  .controller('GamesEditController', GamesEditController);


GamesIndexController.$inject = ['Game'];
function GamesIndexController(Game) {
  const gamesIndex = this;

  gamesIndex.all = Game.query();
}

GamesShowController.$inject = ['Game', '$state', 'Membership', '$window'];
function GamesShowController(Game, $state, Membership, $window) {
  const gamesShow = this;
  function deleteGame() {
    gamesShow.game.$remove(() => {
      $state.go('gamesIndex');
    });
  }

  gamesShow.delete = deleteGame;
  gamesShow.leaveGame = leaveGame;

  gamesShow.game = Game.get($state.params);

  function leaveGame(membership) {
    Membership.delete(membership, ()=> {
      const index = gamesShow.game.memberships.indexOf(membership);
      gamesShow.game.memberships.splice(index, 1);
      //do whatever
    });
  }

  function numberOfPlayers() {
    return gamesShow.game.$resolved ? gamesShow.game.memberships.length : 0;
  }

  function numberOfPlaces() {
    return gamesShow.game.$resolved ? gamesShow.game.no_of_places : 0;
  }

  // check if this game can be joined based on number of available places
  gamesShow.canJoinGame = canJoinGame;
  function canJoinGame() {
    return (numberOfPlayers() < numberOfPlaces());
  }

  gamesShow.addMembership = addMembership;
  function addMembership(){
    const membership = {
      game_id: $state.params.id
    };
    Membership.save(membership, (data) => {
      console.log(data);
      $window.location.reload();
    });
  }
}

GamesNewController.$inject = ['Game', '$state', 'Venue'];
function GamesNewController(Game, $state, Venue) {
  const gamesNew = this;

  gamesNew.game = {};

  function create() {
    Game.save(gamesNew.game, () => {
      $state.go('gamesIndex');
    });
  }
  gamesNew.create = create;
  gamesNew.venues = Venue.query();
}

GamesEditController.$inject = ['Game', '$state'];
function GamesEditController(Game, $state) {
  const gamesEdit = this;

  gamesEdit.game = Game.get($state.params);

  function update() {
    gamesEdit.game.$update(() => {
      $state.go('gamesShow', $state.params);
    });
  }
  this.update = update;
}
