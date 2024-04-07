app.controller('cartCtrl', function ($scope, $rootScope, $location) {
    if (!$rootScope.user) {
        alert("Hãy đăng nhập để thực hiện chức năng");
        $location.path('/login')
    }
    $scope.tinhTong = function () {
        let tong = 0;
        if ($rootScope.cart) {
            $rootScope.cart.forEach(sp => {
                tong += sp.price * sp.quantity;
            })
        }
        return tong;
    }

    $scope.saveCart = function () {
        localStorage.setItem("cart", JSON.stringify($rootScope.cart))
    }

    $scope.delete = function (index) {
        $rootScope.cart.splice(index, 1)
        $scope.saveCart()
    }

    $scope.deleteALL = function () {
        $rootScope.cart = [];
        $scope.saveCart()
    }

})