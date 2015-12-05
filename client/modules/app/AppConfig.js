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
    })
     ;

    $httpProvider.interceptors.push('httpInterceptor');
    
    
        
}]);
