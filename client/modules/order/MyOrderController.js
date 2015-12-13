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


}]);