/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("loginController",["$scope","$rootScope","$log","$modal", "$interval","$state","UserService","localStorageService","OrderService",
    function($scope,$rootScope,$log,$modal,$interval,$state,UserService,localStorageService,OrderService){

    $log.debug('initializing login controller');
    $scope.signupprogress = false;

    $scope.loginform ={};
    $scope.signupform ={};

    var modal;

    //check cart
    if( !$rootScope.loggedIn) {
        $rootScope.cartImages = localStorageService.get("cart");
    }


    $scope.openLoginPopup = function(){
        $log.debug('opening login modal');
         modal = $modal({scope: $scope, templateUrl: 'modules/common/tmpl/modal/login-modal.html', show: true});
    }

    $scope.submitLogin = function(){
        $scope.showLoginErr ='';
        $scope.signupprogress = true;

        $log.debug($scope.loginform );

        if(!$scope.loginform.email || !$scope.loginform.password ){
            $scope.showLoginErr = 'Please provide email and password.';
            $scope.signupprogress = false;
            return;
        }

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
    $scope.checkout = function(){
      $state.go('checkout');
    }

    $scope.logout = function(){
        $rootScope.loggedIn = false;
        $rootScope.state.user=undefined;
    }

    $scope.register = function(){
        $scope.showSignupErr ='';
        $scope.signupprogress = true;

        $log.debug($scope.signupform );

        if(!$scope.signupform.firstName || !$scope.signupform.lastName || !$scope.signupform.email || !$scope.signupform.password || !$scope.signupform.password2){
            $scope.showSignupErr = 'Please provide data for all the fields.';
            $scope.signupprogress = false;
            return;
        }
        if($scope.signupform.password !=$scope.signupform.password2 ){
            $scope.showSignupErr = 'Both passwords did not match.';
            $scope.signupprogress = false;
            return;
        }
        UserService.register($scope.signupform).then(function(data){
            $scope.signupprogress = false;
            if(data.errorCode){
                $scope.showSignupErr = data.errorMessage;
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
}]);
