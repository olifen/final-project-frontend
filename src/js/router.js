angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html'
    })
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('gamesIndex', {
      url: '/games',
      templateUrl: '/templates/gamesIndex.html',
      controller: 'GamesIndexController as gamesIndex'
    })
    .state('gamesNew', {
      url: '/games/new',
      templateUrl: '/templates/gamesNew.html',
      controller: 'GamesNewController as gamesNew'
    })
    .state('gamesShow', {
      url: '/games/:id',
      templateUrl: '/templates/gamesShow.html',
      controller: 'GamesShowController as gamesShow'
    })
    .state('gamesEdit', {
      url: '/games/:id/edit',
      templateUrl: '/templates/gamesEdit.html',
      controller: 'GamesEditController as gamesEdit'
    })
    .state('venuesIndex', {
      url: '/venues',
      templateUrl: '/templates/venuesIndex.html',
      controller: 'VenuesIndexController as venuesIndex'
    })
    .state('venuesNew', {
      url: '/venues/new',
      templateUrl: '/templates/venuesNew.html',
      controller: 'VenuesNewController as venuesNew'
    })
    .state('venuesShow', {
      url: '/venues/:id',
      templateUrl: '/templates/venuesShow.html',
      controller: 'VenuesShowController as venuesShow'
    })
    .state('venuesEdit', {
      url: '/venues/:id/edit',
      templateUrl: '/templates/venuesEdit.html',
      controller: 'VenuesEditController as venuesEdit'
    });

  $urlRouterProvider.otherwise('/home');
}
