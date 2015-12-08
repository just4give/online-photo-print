/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("LoginController",["$scope","$rootScope","$log","$modal", "$interval",function($scope,$rootScope,$log,$modal,$interval){

    $scope.signupprogress = false;

    var modal;

        $scope.openLoginPopup = function(){
         modal = $modal({scope: $scope, templateUrl: 'modules/common/tmpl/modal/login-modal.html', show: true});
    }

    $scope.submitLogin = function(form){
        $rootScope.loggedIn = true;
    }

    $scope.logout = function(){
        $rootScope.loggedIn = false;
    }

    $scope.register = function(){
        $scope.signupprogress = true;
        $interval(function(){
            $scope.signupprogress = false;
            if(modal){
                modal.hide();
            }
            $rootScope.loggedIn = true;
        },2000);
    }
}]);
