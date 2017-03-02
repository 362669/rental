var rental = angular.module('rental', []);
var apiServer = 'http://localhost:8081/api';

rental.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $http.get(apiServer + '/movies')
        .then(function(movies) {
            $scope.movies = movies.data;
        });

    $http.get(apiServer + '/movies')
        .then(function(movies) {
            $scope.movies = movies.data;
        });

    /*$scope.createTodo = function() {
     $http.post('/api/todos', $scope.formData)
     .success(function(data) {
     $scope.formData = {}; // clear the form so our user is ready to enter another
     $scope.todos = data;
     console.log(data);
     })
     .error(function(data) {
     console.log('Error: ' + data);
     });
     };*/

    /*$scope.deleteTodo = function(id) {
     $http.delete('/api/todos/' + id)
     .success(function(data) {
     $scope.todos = data;
     console.log(data);
     })
     .error(function(data) {
     console.log('Error: ' + data);
     });
     };*/
}]);

rental.controller('aboutController', ['$scope', '$http', function($scope, $http) {
    $http.get(apiServer + '/about')
        .then(function(about) {
            $scope.about = about.data;
            $scope.days = {
                monday: 'Poniedziałek',
                thusday: 'Wtorek',
                wednesday: 'Środa',
                thursday: 'Czwartek',
                friday: 'Piątek',
                saturday: 'Sobota',
                sunday: 'Niedziela'
            }
    })
}]);