/**
 * Created by leona on 4/30/15.
 */
angular.module('userApp',['ngRoute','ui.sortable'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'views/home.html',
                controller: 'HomeCtrl'
            })
            .otherwise({redirectTo:'/'});
    }]);
