app.controller('loginCtrl', function($scope, $http, $rootScope, $location) {
    $scope.isError = false;
    $scope.login = function () {
        $http.get(`http://localhost:3000/user?account=${$scope.email}&password=${$scope.password}`).then(
            function (res) {
                if (res.data.length == 0) {// ko đăng nhập dược
                    $scope.isError = true;
                }else{
                    $rootScope.user=res.data[0];
                    localStorage.setItem('user', JSON.stringify(res.data[0]));
                    $location.path('/');
                }
            },
            function(res){
                $scope.isError= true;
            }
        )
    }

})