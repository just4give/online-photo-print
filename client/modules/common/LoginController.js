/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("loginController",["$scope","$rootScope","$log","$modal", "$interval","UserService",function($scope,$rootScope,$log,$modal,$interval,UserService){

    $log.debug('initializing login controller');
    $scope.signupprogress = false;

    $scope.loginform ={};

    var modal;

    $scope.openLoginPopup = function(){
        $log.debug('opening login modal');
         modal = $modal({scope: $scope, templateUrl: 'modules/common/tmpl/modal/login-modal.html', show: true});
    }

    $scope.submitLogin = function(){
        $scope.showLoginErr ='';
        $scope.signupprogress = true;

        $log.debug($scope.loginform );
        UserService.login($scope.loginform).then(function(data){
            $scope.signupprogress = false;
            if(data.errorCode){
                $scope.showLoginErr = data.errorMessage;
            }else{
                if(!$rootScope.state){
                    $rootScope.state ={};
                }
                $rootScope.state.user = data;
                $rootScope.loggedIn = true;
                if(modal){
                    modal.hide();
                }
            }
        },function(err){
            $scope.signupprogress = false;
            $rootScope.$broadcast('api_error',err);
        });


    }

    $scope.logout = function(){
        $rootScope.loggedIn = false;
        $rootScope.state.user=undefined;
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
