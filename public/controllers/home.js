/**
 * Created by leona on 5/1/15.
 */
'use strict';

angular.module('todoApp')
.controller('HomeCtrl',['$scope','$http', function($scope, $http){

        function loadTodos(){
            $http.get('http://localhost:3000/api/todos/').success(function(res){
                $scope.todos = res;

            });
        }

        loadTodos();

        $scope.addTodo = function(todo){
            $http.post('http://localhost:3000/api/todos/',{activity:todo}).success(function(){
                loadTodos();

            });
            $scope.todo = '';

        };

        $scope.removeTodo = function(id){

            $http.delete('http://localhost:3000/api/todos/'+id).success(function(){
                loadTodos();
            });
            
        };

    }]);