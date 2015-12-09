/**
 * Created by mithundas on 12/3/15.
 */
var appModule = angular.module("photoOrder",['ui.router','ui.bootstrap','ngAnimate', 'ngTouch','mgcrea.ngStrap','angular-confirm','LocalStorageModule']);

appModule.config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('photoOrder')
        .setStorageType('localStorage') //sessionStorage
        .setNotify(true, true)
});

appModule.directive('autofocus', ['$timeout', function($timeout) {
    return {
        restrict: 'A',
        link : function($scope, $element) {
            $timeout(function() {
                $element[0].focus();
            });
        }
    }
}]);