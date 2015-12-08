/**
 * Created by Mithun.Das on 12/7/2015.
 */
appModule.controller("MyOrderController",["$scope","$rootScope","$log","$modal","$state", "$interval",function($scope,$rootScope,$log,$modal,$state,$interval){

    $scope.orders = [{orderedOn: new Date(), orderId:'080-100-201',orderCost: 900, status:'Ordered'},
        {orderedOn: new Date(), orderId:'080-100-301',orderCost: 1900, status:'Printed'},
        {orderedOn: new Date(), orderId:'080-100-401',orderCost: 700, status:'Shipped'},
        {orderedOn: new Date(), orderId:'080-100-201',orderCost: 900, status:'Ordered'},
        {orderedOn: new Date(), orderId:'080-100-501',orderCost: 1500, status:'Delivered'}];



}]);