angular.module('finalProject')
  .controller('GamesIndexController', GamesIndexController);


GamesIndexController.$inject = ['Game'];
function GamesIndexController(Game) {
  const gamesIndex = this;

  gamesIndex.all = Game.query();
}
