/**
 * Created by mithundas on 12/3/15.
 */
var appModule = angular.module("photoOrder",['ui.router','ui.bootstrap','ngAnimate', 'ngTouch','mgcrea.ngStrap','angular-confirm',
    'LocalStorageModule','ngFileUpload','facebook']);

appModule.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('photoOrder')
        .setStorageType('localStorage') //sessionStorage
        .setNotify(true, true)
    console.log('storage config...');
});

appModule.run(["$interval","localStorageService","$rootScope", function($interval,localStorageService,$rootScope){
    console.log('angular run...');
    $interval(function(){
        localStorageService.remove("cart");
    },1000*60*10);



        //create a new instance
        new WOW().init();

        $rootScope.$on('$routeChangeStart', function (next, current) {
            //when the view changes sync wow
            new WOW().sync();
        });


}]);

appModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    console.log('http config...');
}
]);

appModule.config(function(FacebookProvider) {
    // Set your appId through the setAppId method or
    // use the shortcut in the initialize method directly.
    FacebookProvider.init('341307939406976');
    console.log('fb config...');
})

angular.element(document).ready(function() {
    console.log('document ready...');
});
