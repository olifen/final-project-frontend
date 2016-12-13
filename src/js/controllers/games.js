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

GamesShowController.$inject = ['Game', '$state'];
function GamesShowController(Game, $state) {
  const gamesShow = this;

  function deleteGame() {
    gamesShow.game.$remove(() => {
      $state.go('gamesIndex');
    });
  }

  gamesShow.delete = deleteGame;

  gamesShow.game = Game.get($state.params);
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
