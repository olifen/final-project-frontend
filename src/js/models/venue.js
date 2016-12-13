angular.module('finalProject')
  .factory('Venue', Venue);

Venue.$inject = ['$resource', 'API_URL'];
function Venue($resource, API_URL) {
  return new $resource(`${API_URL}/venues/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
