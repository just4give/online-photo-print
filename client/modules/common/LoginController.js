/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("loginController",["$scope","$rootScope","$log","$modal", "$interval","$timeout","$state","UserService","localStorageService","OrderService","Facebook",
    function($scope,$rootScope,$log,$modal,$interval,$timeout,$state,UserService,localStorageService,OrderService,Facebook){

    $log.debug('initializing login controller');
    $scope.signupprogress = false;

    $scope.loginform ={};
    $scope.signupform ={};
    $rootScope.fbLoggedIn = false;
    $rootScope.fbUser = {};

    var modal;

        angular.element(document).ready(function() {
            console.log('document ready inside logib controller...');
            $rootScope.hideAppSpinner = true;
            $timeout(function(){
                $rootScope.appLoaded = true;
                $('header').css('display','block');
                $('nav').css('display','block');
            },2000);

        });
    //check cart
    if( !$rootScope.loggedIn) {
        $rootScope.cartImages = localStorageService.get("cart");
    }
    //check if user cookie is available, if yes, log user in
       var userCookie =  localStorageService.cookie.get("app-user");
        if(userCookie && userCookie.uuid){
            $log.debug('user cookie found');
            $log.debug(userCookie);
            $rootScope.state = $rootScope.state || {};
            $rootScope.state.user = userCookie;
            $rootScope.loggedIn = true;
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
            $log.debug(data);

            if(data.errorCode){
                $scope.showLoginErr = data.errorMessage;
            }else{
                if(!$rootScope.state){
                    $rootScope.state ={};
                }
                $rootScope.state.user = data;
                $rootScope.loggedIn = true;
                $scope.setUserCookie(data);

                if(modal){
                    modal.hide();
                }

                //if cart is not empty , persist cart and remove from local storage
                if( $rootScope.cartImages &&  $rootScope.cartImages.length>0){
                    OrderService.saveCart($rootScope.cartImages)
                        .then(function(data){
                            $log.debug('cart saved...');
                            $log.debug(data);
                            localStorageService.remove("cart");
                            $rootScope.retrieveCart();


                        },function(err){
                            $log.debug('erro saving cart...');
                            $rootScope.$broadcast('api_error',err);
                        });
                }else{
                    $log.debug('get cart');
                    $rootScope.retrieveCart();
                }
                //then fetch call cart details
            }
        },function(err){
            $scope.signupprogress = false;
            $rootScope.$broadcast('api_error',err);
        });


    }
    $scope.checkout = function(){
      $state.go('checkout');
    }

    $rootScope.retrieveCart = function(){
        OrderService.getCart()
            .then(function(data){
               // $rootScope.cartImages =data;
                $rootScope.cartImages =[];
                angular.forEach(data, function(item){
                    $rootScope.cartImages.push({id:item.id, imgId:item.imgId, imgSrc:item.imgSrc, quantity: item.quantity, format: {frameSize: item.frameSize, price: item.price},paperFinish:item.paperFinish,
                        userId:item.userId});
                })


            },function(err){
                $rootScope.$broadcast('api_error',err);
            });
    }

    $scope.logout = function(){
        $rootScope.loggedIn = false;
        $rootScope.state.user=undefined;
        $rootScope.cartImages=[];
        localStorageService.remove("cart");
        localStorageService.cookie.remove("app-user");
        $state.go('/');
    }
    $scope.setUserCookie=function(data){
        localStorageService.cookie.set("app-user",data,1);
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
                $scope.setUserCookie(data);
                if(modal){
                    modal.hide();
                }
            }
        },function(err){
            $scope.signupprogress = false;
            $rootScope.$broadcast('api_error',err);
        });

    }


    //FB login /reg stuffs starts here
        $scope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        Facebook.getLoginStatus(function(response) {
            $log.debug('checking fb login status');
            $log.debug(response);
            if (response.status == 'connected') {
                $rootScope.fbLoggedIn = true;
                $scope.me();
            }

        });

        $scope.fbRegister = function(){

            if(!$rootScope.fbLoggedIn){
                Facebook.login(function(response) {
                    $log.debug(response);
                    if (response.status == 'connected') {
                        $rootScope.fbLoggedIn = true;
                        $scope.me( $scope.fbRegisterOpenModal);

                    }

                });
            }else{

                $scope.fbRegisterOpenModal();
            }

        }

        var fbRegModal ;
        $scope.fbRegisterOpenModal = function(){

            fbRegModal = $modal({scope: $scope, templateUrl: 'modules/common/tmpl/modal/fb-reg-modal.html', show: true});
        }
        $scope.fbRegisterAppConfirm = function(){

            if(!$rootScope.fbUser.first_name || !$rootScope.fbUser.last_name || !$rootScope.fbUser.email || ! $rootScope.fbUser.id ){
                $scope.fbShowSignupErr = 'Please provide data for all the fields.';
                $scope.signupprogress = false;
                return;
            }

            var fbUser = {
                firstName: $rootScope.fbUser.first_name,
                lastName: $rootScope.fbUser.last_name,
                email: $rootScope.fbUser.email,
                facebookId: $rootScope.fbUser.id
            };
            UserService.fbRegister(fbUser).then(function(data){
                $scope.signupprogress = false;
                if(data.errorCode){
                    $scope.showSignupErr = data.errorMessage;
                }else{
                    if(!$rootScope.state){
                        $rootScope.state ={};
                    }
                    $rootScope.state.user = data;
                    $rootScope.loggedIn = true;
                    $scope.setUserCookie(data);
                    if(modal){
                        modal.hide();
                    }
                    if(fbRegModal){
                        fbRegModal.hide();
                    }
                }
            },function(err){
                $scope.signupprogress = false;
                $rootScope.$broadcast('api_error',err);
            });


        }
        $scope.fbLogin = function() {


            if(!$rootScope.fbLoggedIn){
                Facebook.login(function(response) {
                    $log.debug(response);
                    if (response.status == 'connected') {
                        $rootScope.fbLoggedIn = true;
                        $scope.me($scope.fbLoginApp);

                    }

                });
            }else{
                $scope.fbLoginApp();
            }

        };


        $scope.fbLoginApp = function(){
            $scope.showLoginErr ='';
            $scope.signupprogress = true;



            if(!$rootScope.fbUser.email || !$rootScope.fbUser.id ){
                $scope.showLoginErr = 'Something went wrong with facebook login.';
                $scope.signupprogress = false;
                return;
            }


            var fbUser = {
                email: $rootScope.fbUser.email,
                facebookId: $rootScope.fbUser.id
            };

            UserService.fbLogin(fbUser).then(function(data){
                $scope.signupprogress = false;
                $log.debug(data);

                if(data.errorCode){
                    $scope.showLoginErr = data.errorMessage;
                }else{
                    if(!$rootScope.state){
                        $rootScope.state ={};
                    }
                    $rootScope.state.user = data;
                    $rootScope.loggedIn = true;
                    $scope.setUserCookie(data);
                    if(modal){
                        modal.hide();
                    }

                    //if cart is not empty , persist cart and remove from local storage
                    if( $rootScope.cartImages &&  $rootScope.cartImages.length>0){
                        OrderService.saveCart($rootScope.cartImages)
                            .then(function(data){
                                $log.debug('cart saved...');
                                $log.debug(data);
                                localStorageService.remove("cart");
                                $rootScope.retrieveCart();


                            },function(err){
                                $log.debug('erro saving cart...');
                                $rootScope.$broadcast('api_error',err);
                            });
                    }else{
                        $log.debug('get cart');
                        $rootScope.retrieveCart();
                    }
                    //then fetch call cart details
                }
            },function(err){
                $scope.signupprogress = false;
                $rootScope.$broadcast('api_error',err);
            });
        }

        $scope.me = function(callback) {
            Facebook.api('/me', function(response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */

                $scope.$apply(function() {
                    $rootScope.fbUser = response;
                    if(callback){
                        callback();
                    }
                });

            });
        };
       /* $scope.logout = function() {
            Facebook.logout(function() {
                $scope.$apply(function() {
                    $scope.user   = {};
                    $scope.logged = false;
                });
            });
        }*/
}]);
