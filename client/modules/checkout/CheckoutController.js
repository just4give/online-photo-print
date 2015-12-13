/**
 * Created by Mithun.Das on 12/7/2015.
 */
appModule.controller("CheckoutController",["$scope","$rootScope","$log","$modal","$state", "$interval","$confirm","OrderService",
    function($scope,$rootScope,$log,$modal,$state,$interval,$confirm,OrderService){

    $log.debug('initializing CheckoutController');

    $scope.totalProductPrice = 0;
    $scope.shippingCost =0;
    $scope.savings =0;

    $scope.order ={};
    $scope.addresses=[];
    //$scope.cartImages = $rootScope.cartImages || [];

    /*$scope.addresses =[{ id:1, firstName: "Micky", lastName:"Mouse", address:"123 Main Stree",city:"Belgrade","zip":10104,"defaultAddress":false},
        { id:2 , firstName: "Donald", lastName:"Duck", address:"123 Main Stree",city:"Belgrade","zip":10104, "defaultAddress":true}];
*/
   //find default shipping address
    /*angular.forEach($scope.addresses , function(addr){
        if(addr.defaultAddress){
            $scope.shippingAddress = addr;
        }
    })*/

        $rootScope.$watch('loggedIn',function(){
            if($rootScope.loggedIn){
                $log.debug('user logged in ');
                //get default addess
                OrderService.defaultAddress()
                    .then(function(data){
                       if(data !=null) {
                           $scope.shippingAddress = data;
                           $scope.order.addressId = data.id;
                           //$scope.addresses.push(data);
                       }
                    },function(err){
                        $rootScope.$broadcast('api_error',err);
                    });
                OrderService.allAddress()
                    .then(function(data){
                        $scope.addresses=data;
                    },function(err){
                        $rootScope.$broadcast('api_error',err);
                    });



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

            }else{
                $log.debug('user logged out ');
            }

        });

        $scope.updateShippingMethod = function(){
            $scope.shippingCost = $scope.order.shippingMethod.price;
        }

    OrderService.getShippingMethod()
        .then(function(data){
            $scope.shippingMethods = data;
            $scope.order.shippingMethod = data[0];
            $scope.updateShippingMethod();
        },function(err){
            $rootScope.$broadcast('api_error',err);
    });




    $scope.openAddressPopup = function(mode){
        if(mode === 'add'){
            $scope.addAddress = true;
            $scope.default = true;
        }else{
            $scope.addAddress = false;
            $scope.default = false;
        }
        $scope.address ={};
        var modal = $modal({scope: $scope, templateUrl: 'modules/checkout/tmpl/modal/address-modal.html', show: true});
    }

    $scope.submitAddress = function(){
        var address = $scope.address;
        $log.debug(address);


        if(address.id){
            if($scope.default) {
                address.defaultAddress = true;
                OrderService.saveAddress(address)
                    .then(function(data){
                        $scope.shippingAddress = data;
                        $scope.order.addressId = data.id;


                    },function(err){
                        $rootScope.$broadcast('api_error',err);
                    })
            }else{
                address.defaultAddress = false;
                OrderService.saveAddress(address)
                    .then(function(data){
                        if(address.ship2this){
                            $scope.shippingAddress = data;
                            $scope.order.addressId = data.id;
                        }



                    },function(err){
                        $rootScope.$broadcast('api_error',err);
                    })
            }

        }else{
            if($scope.default) {
                address.defaultAddress = true;
                OrderService.saveAddress(address)
                    .then(function(data){
                        $scope.shippingAddress = data;
                        $scope.order.addressId = data.id;
                        $scope.addresses.push(address);

                    },function(err){
                        $rootScope.$broadcast('api_error',err);
                    })
            }else{
                address.defaultAddress = false;
                OrderService.saveAddress(address)
                    .then(function(data){
                        if(address.ship2this){
                            $scope.shippingAddress = data;
                            $scope.order.addressId = data.id;
                        }

                        $scope.addresses.push(address);

                    },function(err){
                        $rootScope.$broadcast('api_error',err);
                    })
            }

        }



    }

    $scope.ship2this = function(index){
        $scope.shippingAddress =  $scope.addresses[index];
        $scope.order.addressId = $scope.shippingAddress.id;
    }

    $scope.editAddress = function(index){
        $scope.address = $scope.addresses[index];
        $scope.addAddress = true;
    }

    /*$scope.deleteAddress = function(index){
        if($scope.addresses[index].defaultAddress){
            $scope.shippingAddress ={};
        }
        $scope.addresses.splice(index,1);
    }*/

    $scope.orderprogress=false;
    $scope.placeOrder = function(){
        $scope.modalErrorMessage ='';

        var noOfPrints =0;
        angular.forEach($rootScope.cartImages, function(item){
            noOfPrints+= item.quantity;
        });

        if(noOfPrints <=0){
            $scope.modalErrorMessage ='Your cart is empty.';
            $modal({scope: $scope, templateUrl: 'modules/common/tmpl/modal/api-error-modal.html', show: true});
            return;
        }


        $confirm({text: 'By clicking "I Confirm" , you will finalize your order.' ,ok:"I Confirm",cancel:"Cancel" , title:"Confirm your order"})
            .then(function() {
                $log.debug("Your order is finalized.");


                $scope.order.noOfProduct = $scope.cartImages.length;

                $scope.order.noOfPrints = noOfPrints;
                $scope.order.printCost = $scope.totalProductPrice;
                $scope.order.shippingCost = $scope.shippingCost;
                $scope.order.discount= $scope.savings;
                $scope.order.finalCost = $scope.totalProductPrice+$scope.shippingCost-$scope.savings;
                $scope.order.cart = $rootScope.cartImages;
                $scope.orderprogress=true;


                OrderService.placeOrder($scope.order)
                    .then(function(data){
                        $scope.orderprogress=false;
                        $state.go("myorder");
                    },function(err){
                        $scope.orderprogress=false;
                        $rootScope.$broadcast('api_error',err);
                    })


            });
    }

    $scope.getTotalProductPrice = function(){
        $log.debug('updating price');
        $scope.totalProductPrice = 0;
        angular.forEach($scope.cartImages, function(product){
            $scope.totalProductPrice+= product.format.price* product.quantity;
        })
        return $scope.totalProductPrice;
    };

    $rootScope.retrieveCart = function(){
            OrderService.getCart()
                .then(function(data){
                    // $rootScope.cartImages =data;
                    $rootScope.cartImages =[];
                    angular.forEach(data, function(item){
                        $rootScope.cartImages.push({id:item.id, imgId:item.imgId, imgSrc:item.imgSrc, quantity: item.quantity, format: {frameSize: item.frameSize, price: item.price}});
                    })


                },function(err){
                    $rootScope.$broadcast('api_error',err);
                });
        }


}]);

appModule.run(function($confirmModalDefaults) {
    $confirmModalDefaults.templateUrl = 'modules/checkout/tmpl/modal/order-confirm-modal.html';
    $confirmModalDefaults.defaultLabels.title = 'Modal Title';
    $confirmModalDefaults.defaultLabels.ok = 'Yes';
    $confirmModalDefaults.defaultLabels.cancel = 'No';
})
