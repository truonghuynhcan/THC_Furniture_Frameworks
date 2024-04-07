app.controller('proDetailCtrl', function ($scope, $rootScope, $routeParams, $http) {
    $http.get(`http://localhost:3000/products/${$routeParams.id}`).then(
        function (res) {//thành công
            $scope.item = res.data;
            // $scope.react('view'); 
        },

        function (res) { // mẹ thành công
            alert('Không lấy được dữ liệu chi tiết sản phẩm')
        }
    );

    $scope.comment = function () {
        $http.post(`http://localhost:3000/comments`, {
            idPro: $routeParams.id,
            content: $scope.content,
            idUser: $scope.user.id,
            name: $scope.user.name,
            date: new Date().toLocaleString('sv-SE'),//yyyy-MM-dd  HH:mm:ss
        }).then(
            function(res){
                // cập nhật lại dnah sách bình luận
                $scope.content = '';
            },
            function (res) {
            }
        )
        $scope.loadComment();
    }
    $scope.dsBL = [];
    $scope.BLnum = 2;
    $scope.loadComment = function () {
        $http.get(`http://localhost:3000/comments?idPro=${$routeParams.id}`).then(
            function (res) {
                $scope.dsBL = res.data
            },
            function (res) {
                console.log('(～￣▽￣)～ Lỗi');
            }
        )
    }
    $scope.loadComment();

    $scope.xoaBL = function (id) {
        var confirmation = confirm("Bạn có chắc chắn muốn xóa bình luận này?");

        if (confirmation) {
            $http.delete(`http://localhost:3000/comments/${id}`).then(
                function (response) {
                    alert("Bình luận đã được xóa");
                    $scope.loadComment();
                },
                function (error) {
                    alert("Đã xảy ra lỗi khi xóa bình luận:", error);
                }
            );
            $scope.loadComment();
        }
    }

    $scope.xemthemBL = function () {
        if ($scope.BLnum <= ($scope.dsBL.length-1)) {
            $scope.BLnum += 2
        }
        $scope.loadComment();
    }
})