angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope', 'User'];
function MainController($auth, $state, $rootScope, User) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.message = null;

  function logout() {
    $auth.logout()
      .then(() => {
        $state.go('home');
      });
  }

  const protectedStates = ['usersEdit', 'usersNew'];

  function secureState(e, toState) {
    const authPayload = $auth.getPayload();

    if (authPayload) {
      main.currentUser = User.get({ id: authPayload.id });
    }
    main.message = null;
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      main.message = 'You must be logged in to go there';
    }
  }

  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;
}
