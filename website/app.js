var app = angular.module('myapp', ['ngRoute'])
app.run(function($rootScope) {
        $rootScope.$on('$locationChangeStart', () => { $rootScope.loading = true; })
        $rootScope.$on('$locationChangeSuccess', () => { $rootScope.loading = false;})
        $rootScope.$on('$locationChangeError', () => { $rootScope.loading = false; })
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'view/page_home.html',
                controller:"homeCtrl"
            })
            // SP === === === === === === === === === === === === === === === === === ===
            .when('/san-pham/:id', {
                templateUrl: 'view/pro_detail.html',
                controller:"proDetailCtrl"
            })
            .when('/login', {
                templateUrl: 'view/user_login.html',
                controller:"loginCtrl"
            })
            .when('/signup', {
                templateUrl: 'view/user_signup.html',
                controller:"signupCtrl"

            })
            .when('/cart', {
                templateUrl: 'view/page_cart.html',
                controller:"cartCtrl"
            })
            .when('/checkout', {
                templateUrl: 'view/checkout.html',
                controller:"checkoutCtrl"
            })
            .when('/orderDetail/:id', {
                templateUrl: 'view/info_orderDetail.html',
                controller:"infoOrdersCtrl"
            })
            .when('/info_orders', {
                templateUrl: 'view/info_orders.html',
                controller:"infoOrdersCtrl"
            })
            .when('/info', {
                templateUrl: 'view/info.html',
            })
            .when('/news', {
                templateUrl: 'view/news.html'
            })
            .when('/agent', {
                templateUrl: 'view/page_agent.html'
            })
            .when('/about', {
                templateUrl: 'view/page_about.html'
            })
            .otherwise({
                template: '<h1>404 - ko tìm thấy</h1>'
            })
    })
    