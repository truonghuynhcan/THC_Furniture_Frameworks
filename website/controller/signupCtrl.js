app.controller('signupCtrl', function ($scope, $http, $rootScope, $location) {
    $scope.isError = false;
    $scope.signup = function () {
        if(!($scope.name || $scope.email || $scope.phone ||$scope.password || $scope.repassword)){
            alert('Nhập thiếu gì kìa >_<')
            $scope.isError = true;
            return;
        }
        if ($scope.password.length<6) {
            $scope.isError = true;
            $scope.password ='';
            $scope.repassword ='';
            alert("Hãy nhập dài hơn 6 ký tự để có thể bảo mật tốt hơn");
            return;
        }
        if ($scope.password !== $scope.repassword) {
            $scope.isError = true;
            $scope.password ='';
            $scope.repassword ='';
            alert("Nhập mật khẩu chưa khớp kìa");
            return;
        } 

        if (!$scope.isError) {
            $http.post(`http://localhost:3000/user`, {
                name: $scope.name,
                account: $scope.email,
                phone: $scope.phone,
                password: $scope.password,
            }).then(
                function (res) {
                    $rootScope.isSignup = true;
                    $location.path('/login');
                },
                function (res) {
                    $scope.isError = true;
                }
            )
        }

    }

})