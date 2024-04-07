app.controller('infoOrdersCtrl', function ($scope, $rootScope, $http, $routeParams) {
    $scope.tinhTong = function (ds) {
        let tong = 0;
        ds.forEach(sp => {
            tong += sp.price * sp.quantity;
        })
        return tong;
    }
    if ($routeParams.id) {
        $http.get(`http://localhost:3000/orders?id${$routeParams.id}`).then(
        // $http.get(`http://localhost:3000/orders?idUser${$rootScope.user.id}&id`).then(
            function (res) {
                $scope.order = res.data[0];
            },
            function(res){
                $scope.isError= true;
            }
        )
    }else{
        $http.get(`http://localhost:3000/orders?idUser${$rootScope.user.id}`).then(
            function (res) {
                $scope.orders = res.data;
            },
            function(res){
                $scope.isError= true;
            }
        )
    }
})