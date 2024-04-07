app.controller('homeCtrl', function ($scope, $http, $rootScope) {
    $scope.dsSP = [];
    
    $http.get('http://localhost:3000/products').then(
        function (res) {//thành công
            $scope.dsSP = res.data;
        },
        function (res) { // mẹ thành công

        }
    )
})