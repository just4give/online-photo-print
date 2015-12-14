/**
 * Created by mithundas on 12/3/15.
 */
var appModule = angular.module("photoOrder",['ui.router','ui.bootstrap','ngAnimate', 'ngTouch','mgcrea.ngStrap','angular-confirm',
    'LocalStorageModule','ngFileUpload']);

appModule.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('photoOrder')
        .setStorageType('localStorage') //sessionStorage
        .setNotify(true, true)
});

appModule.run(["$interval","localStorageService", function($interval,localStorageService){
    $interval(function(){
        localStorageService.remove("cart");
    },1000*60*10);

}]);

appModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;

    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
}
]);