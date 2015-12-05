/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("LoginController",["$scope","$rootScope","$log","$modal", function($scope,$rootScope,$log,$modal){

    $scope.openLoginPopup = function(){
        var modal = $modal({scope: $scope, templateUrl: 'modules/common/tmpl/modal/login-modal.html', show: true});
    }

    $scope.submitLogin = function(form){
        $rootScope.loggedIn = true;
    }
}]);
