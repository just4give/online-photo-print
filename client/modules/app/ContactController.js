/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("ContactController",["$scope","$rootScope","$log","$modal","$state", "$interval","OrderService",
    function($scope,$rootScope,$log,$modal,$state,$interval,OrderService){

    $scope.formData ={};
    $scope.apiMessage ='';

    $scope.submit = function(form){
        $log.debug('contact form submitted');
        $log.debug($scope.formData);

        OrderService.contactUs($scope.formData)
            .then(function(data){
                $scope.apiMessage = data.message;
            },function(err){

            });
    }
}]);