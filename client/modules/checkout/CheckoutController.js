/**
 * Created by Mithun.Das on 12/7/2015.
 */
appModule.controller("CheckoutController",["$scope","$rootScope","$log","$modal","$state", "$interval","$confirm",function($scope,$rootScope,$log,$modal,$state,$interval,$confirm){

    $log.debug('initializing CheckoutController');

    $scope.totalProductPrice = 0;
    $scope.shippingCost =0;
    $scope.savings =0;

    $scope.order ={};

    $scope.cartImages = $rootScope.cartImages || [];

    $scope.addresses =[{ id:1, firstName: "Micky", lastName:"Mouse", address:"123 Main Stree",city:"Belgrade","zip":10104,"defaultAddress":false},
        { id:2 , firstName: "Donald", lastName:"Duck", address:"123 Main Stree",city:"Belgrade","zip":10104, "defaultAddress":true}];

   //find default shipping address
    angular.forEach($scope.addresses , function(addr){
        if(addr.defaultAddress){
            $scope.shippingAddress = addr;
        }
    })


    $scope.shippingMethods = [{id:1, label:"Standard 5 business days", summary:"5 business days after print is ready",price:200,},
        {id:2, label:"Priority shipping", summary:"2 business days after print is ready",price:500,},
        {id:3, label:"Overnight shipping", summary:"1 business day after print is ready",price:1000,}];


    $scope.openAddressPopup = function(mode){
        if(mode === 'add'){
            $scope.addAddress = true;
        }else{
            $scope.addAddress = false;
        }
        $scope.address ={};
        var modal = $modal({scope: $scope, templateUrl: 'modules/checkout/tmpl/modal/address-modal.html', show: true});
    }

    $scope.submitAddress = function(){
        var address = $scope.address;
        if(address.id){
            $log.debug('updaing address '+ address.id);

        }else{
            $log.debug('creating new address');
            address.id = $scope.addresses.length +1;
        }
        if(address.ship2this){
            $scope.shippingAddress = address;
        }
        $scope.addresses.push(address);

    }

    $scope.ship2this = function(index){
        $scope.shippingAddress =  $scope.addresses[index];
    }

    $scope.editAddress = function(index){
        $scope.address = $scope.addresses[index];
        $scope.addAddress = true;
    }

    $scope.deleteAddress = function(index){
        if($scope.addresses[index].defaultAddress){
            $scope.shippingAddress ={};
        }
        $scope.addresses.splice(index,1);
    }

    $scope.placeOrder = function(){
        $confirm({text: 'By clicking "I Confirm" , you will finalize your order.' ,ok:"I Confirm",cancel:"Cancel" , title:"Confirm your order"})
            .then(function() {
                $log.debug("Your order is finalized.");

                $state.go("myorder");

            });
    }

    $scope.getTotalProductPrice = function(){
        $log.debug('updating price');
        $scope.totalProductPrice = 0;
        angular.forEach($scope.cartImages, function(product){
            $scope.totalProductPrice+= product.format.price* product.quantity;
        })
    }();

    $scope.updateShippingMethod = function(){
        $scope.shippingCost = $scope.order.shippingMethod.price;
    }

}]);

appModule.run(function($confirmModalDefaults) {
    $confirmModalDefaults.templateUrl = 'modules/checkout/tmpl/modal/order-confirm-modal.html';
    $confirmModalDefaults.defaultLabels.title = 'Modal Title';
    $confirmModalDefaults.defaultLabels.ok = 'Yes';
    $confirmModalDefaults.defaultLabels.cancel = 'No';
})
