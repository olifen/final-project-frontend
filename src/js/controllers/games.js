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

GamesShowController.$inject = ['Game', '$state', 'Membership', '$window', '$auth'];
function GamesShowController(Game, $state, Membership, $window, $auth) {
  const gamesShow = this;
  function deleteGame() {
    gamesShow.game.$remove(() => {
      $state.go('gamesIndex');
    });
  }
  gamesShow.currentLoggedInUser = $auth.getPayload();
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

  function alreadyInGame() {
    return gamesShow.game.memberships.findIndex((membership) => {
      return membership.user.id === gamesShow.currentLoggedInUser.id;
    }) > -1;
    // const game = Game.get($state.params).$promise.then((game) => {
    //   console.log('game in promise',game);
    // });
    // console.log('game',game);
    // console.log('players: ', players);
    // gamesShow.game.memberships.indexOf(gamesShow.currentLoggedInUser) !== -1"
    // const currentMemebersIds = [];

    // players.forEach((user) => {
    //   console.log(user.id);
    //   // currentMemebersIds.push(user.id);
    //   // console.log(currentMemebersIds);
    //   if (user.id !== gamesShow.currentLoggedInUser.id) {
    //     console.log('he aint here');
    //     return true;
    //   } else {
    //     console.log('hes here');
    //     return false;
    //   }
    // })

  }
  gamesShow.alreadyInGame = alreadyInGame;

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
