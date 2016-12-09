angular.module('finalProject')
  .factory('Game', Game);

Game.$inject = ['$resource', 'API_URL'];
function Game($resource, API_URL) {
  return new $resource(`${API_URL}/games/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
