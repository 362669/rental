var rental = angular.module('rental', []);
var apiServer = 'http://localhost:8081/api';

rental.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $http.get(apiServer + '/movies')
        .then(function(movies) {
            $scope.movies = movies.data;
        });

    $http.get(apiServer + '/categories')
        .then(function(categories) {
            $scope.categories = categories.data;
        });

    var split = window.location.href.split("/"),
        orderStatus = split[split.length - 1];

    if (orderStatus == 'success') {
        $scope.success = true;
    } else {
        $scope.success = false;
    }

    if (orderStatus == 'error') {
        $scope.error = true;
    } else {
        $scope.error = false;
    }
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

rental.controller('cartController', ['$scope', '$http', function($scope, $http) {
    var moviesInCart = [];

    $http.get(apiServer + '/movies')
        .then(function(movies) {
            location.getParams = getParams();

            movies.data.forEach(function(item, key) {
                if (typeof location.getParams[key] !== 'undefined') {
                    moviesInCart[key] = item;
                }
            });

            $scope.movies = moviesInCart;
        });

    $http.get(apiServer + '/categories')
        .then(function(categories) {
            $scope.categories = categories.data;
        });

    $scope.submit = function() {
        var moviesInCart = [];

        $('#formContact').find('input[name^="form.movies"]').each(function(e) {
            moviesInCart.push($(this).data('id'));
        });

        $http({
            method: 'POST',
            url: apiServer + '/borrow',
            data: {
                body: {
                    form: {
                        firstName: $scope.firstName,
                        lastName: $scope.lastName,
                        email: $scope.email,
                        phone: $scope.phone
                    },
                    movieIds: moviesInCart
                }
            }
        }).then(function(callback) {
           if (callback.status == '200') {
               window.location.href = '/success'
           } else {
               window.location.href = '/error'
           }
        });
    };

    function getParams()
    {
        var result = {};
        var tmp = [];

        location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                result [tmp[0]] = decodeURIComponent (tmp[1]);
            });

        return result;
    }
}]);

rental.controller('categoryController', ['$scope', '$http', function($scope, $http) {
    var split = window.location.href.split("/"),
        category = split[split.length - 1];

    $http.get(apiServer + '/movies/' + category)
        .then(function(movies) {
            $scope.movies = movies.data;
        });

    $http.get(apiServer + '/categories')
        .then(function(categories) {
            $scope.categories = categories.data;
        });
}]);