app.controller('checkoutCtrl', function ($scope, $rootScope, $http, $location) {
    if (!$rootScope.user) {
        alert("Hãy đăng nhập để thực hiện chức năng");
        $location.path('/login')
    }
    $scope.shipFee=20000;
    $scope.tinhTong = function () {
        let tong = 0;
        if ($rootScope.cart) {
            $rootScope.cart.forEach(sp => {
                tong += sp.price * sp.quantity;
            })
        }
        return tong;
    }

    $http.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json').then(
        function (res) {
            $scope.dsTinh = res.data
        }
    )

    $scope.order = {
        name: '',
        phone: '',
        address: '',
        products: '',
        idUser: $rootScope.user.id,
        total: '',
        payment:'', //cod, transfer(ck)
        date: '',
        status: 'order', //shipping, success, cancel,...
    }
    $scope.checkout = function () {
        console.log($scope.soNha + ', ' + $scope.phuong.Name + ', ' + $scope.quan.Name + ', ' + $scope.tinh.Name);
        let isInfo = true;
        if ($rootScope.cart.length == 0) {
            alert('Chưa có sản phẩm trong giỏ hàng')
            $location.path('/cart')
            isInfo = false;
            return
        }  
        if (!$scope.order.name || !$scope.order.phone ) {
            alert('Vui lòng điền đầy đủ thông tin nhận hàng');
            isInfo = false;
            return
        } 
        
        if (!$scope.soNha || !$scope.phuong || !$scope.quan || !$scope.tinh) {
            alert('Vui lòng điền đầy đủ thông tin địa chỉ');
            isInfo = false;
            return
        } 
        
        if (!$scope.order.payment) {
            alert('Chọn hình thức thanh toán');
            isInfo = false;
            return
        } 
        if(isInfo) {
            $scope.order.date = new Date().toLocaleDateString('sv-SE');
            $scope.order.products = $rootScope.cart;
            $scope.order.shipFee = $scope.shipFee;
            $scope.order.total = tinhTong()+$scope.shipFee;
            $scope.order.address = $scope.soNha + ', ' + $scope.phuong.Name + ', ' + $scope.quan.Name + ', ' + $scope.tinh.Name;


            $http.post('http://localhost:3000/orders', $scope.order).then(
                function (res) {
                    // xóa giỏ hàng
                    $rootScope.cart = [];
                    localStorage.setItem("cart", JSON.stringify($rootScope.cart))

                    // thông báo -> dẫn đên trang xem đơn hàng
                    alert('Đặt hàng thành công')
                    $location.path('/orderDetail/:'+res.data.id)
                }
            )
        }

    }
})