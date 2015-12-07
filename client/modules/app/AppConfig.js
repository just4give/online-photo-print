appModule.config(["$stateProvider","$urlRouterProvider", "$httpProvider",function($stateProvider, $urlRouterProvider, $httpProvider) {
    
	$urlRouterProvider.otherwise('/');
    
    $stateProvider
      .state('/', {
         url: '/',
         templateUrl: 'modules/app/tmpl/home.html',
         controller: "HomeController"
     }).state('upload', {
        url: '/upload',
        templateUrl: 'modules/upload/tmpl/upload-container.html',
        controller:"UploadController"
    }).state('checkout', {
            url: '/checkout',
            templateUrl: 'modules/checkout/tmpl/checkout.html',
            controller:"CheckoutController"
    }).state('myorder', {
            url: '/myorder',
            templateUrl: 'modules/order/tmpl/my-order.html',
            controller:"MyOrderController"
    })
     ;

    $httpProvider.interceptors.push('httpInterceptor');
    
    
        
}]);
