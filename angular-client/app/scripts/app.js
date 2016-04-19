'use strict';
var module = angular.module('product', []);

var auth = {};
var logout = function(){
    console.log('*** LOGOUT');
    auth.loggedIn = false;
    auth.authz = null;
    window.location = auth.logoutUrl;
};


angular.element(document).ready(function ($http) {
    var keycloakAuth = new Keycloak('keycloak.json');
    auth.loggedIn = false;

    keycloakAuth.init({ onLoad: 'login-required' }).success(function () {
        auth.loggedIn = true;
        auth.authz = keycloakAuth;
        auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/devoxx/protocol/openid-connect/logout?redirect_uri=http://localhost:9000/index.html";

        module.factory('Auth', function() {
            return auth;
        });

        angular.bootstrap(document, ["product"]);
    }).error(function () {
          //  window.location.reload();
        });

});

module.controller('GlobalCtrl', function($scope, $http) {
    $scope.products = [];
    $scope.reloadData = function() {
        $http.get("http://localhost:3000/product").success(function(data) {
            $scope.products = angular.fromJson(data);

        });

    };
    $scope.logout = logout;
});

module.factory('authInterceptor', function($q, Auth) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            if (Auth.authz.token) {
                Auth.authz.updateToken(5).success(function() {
                    config.headers = config.headers || {};
                    config.headers.Authorization = 'Bearer ' + Auth.authz.token;

                    deferred.resolve(config);
                }).error(function() {
                        deferred.reject('Failed to refresh token');
                    });
            }
            return deferred.promise;
        }
    };
});

module.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('authInterceptor');
});
