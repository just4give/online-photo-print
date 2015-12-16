/**
 * Created by Mithun.Das on 12/7/2015.
 */
appModule.controller("MyOrderController",["$scope","$rootScope","$log","$modal","$state", "$interval","OrderService",
    function($scope,$rootScope,$log,$modal,$state,$interval,OrderService){

        $rootScope.$watch('loggedIn',function(){
            if($rootScope.loggedIn){
                $log.debug('user logged in ');
                OrderService.getOrders().
                then(function(data){
                    $scope.orders = data;
                },function(err){
                    $rootScope.$broadcast('api_error',err);
                });

            }else{
                $log.debug('user logged out ');
            }

        });

        $scope.openOderDetails = function(index){

            var orderId = $scope.orders[index].id;
            var addressId =  $scope.orders[index].addressId;
            $log.debug("Order id ="+ orderId);

            OrderService.getOrderDetails(orderId).
            then(function(data){
                $scope.orderDetails = data;
            },function(err){
                $rootScope.$broadcast('api_error',err);
            });

            OrderService.getAddress(addressId).
            then(function(data){
                $scope.shippingAddress = data;
            },function(err){
                $rootScope.$broadcast('api_error',err);
            });


            var  modal = $modal({scope: $scope, templateUrl: 'modules/order/tmpl/modal/order-details-modal.html', show: true});
        }



}]);