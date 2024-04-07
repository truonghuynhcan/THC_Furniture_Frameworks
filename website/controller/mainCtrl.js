app.controller('mainCtrl', function ($scope, $rootScope, $location) {
    if (localStorage.getItem('user')) {
        $rootScope.user = JSON.parse(localStorage.getItem('user'));
    }

    $scope.logout = function () {
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        delete $rootScope.user;
        delete $rootScope.cart;
        $location.path('/login');
    }

    // tương tác giỏ hàng (cart)
    if (localStorage.getItem("cart")) {
        $rootScope.cart = JSON.parse(localStorage.getItem("cart"))
    } else {
        $rootScope.cart = []
    }

    $rootScope.quantity = 1;
    $scope.addToCart = function (sp) {
        let inCart = false;
        // đã có trong cart --> tăng số lượng
        $rootScope.cart.forEach(product => {
            if (product.id == sp.id) {
                inCart = true
                product.quantity += $rootScope.quantity;
            }
        });
        // chưa có trong cart --> thêm vào cart
        if (!inCart) {
            sp.quantity = $rootScope.quantity;
            $rootScope.cart.push(sp);
        }
        $rootScope.quantity = 1;
        localStorage.setItem("cart", JSON.stringify($rootScope.cart))
        alert('Đã thêm sản phẩm '+sp.name)
    }

    // $scope.Date = function (ngay) {
    //     return new Date(ngay);
    // }
})