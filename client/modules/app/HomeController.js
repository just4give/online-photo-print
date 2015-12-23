/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("HomeController",["$scope","$rootScope","$log","$modal","$state", "$interval","PhotoService",
    function($scope,$rootScope,$log,$modal,$state,$interval,PhotoService){

    PhotoService.getPricing().then(function(data){
        $scope.formats = data;
    },function(err){
        $log.debug(err);
        $rootScope.$broadcast('api_error',err);
    });

    $scope.processNames =["one","two","three","four"];
    $scope.currentProcess=0;
    $scope.gotoUpload = function(){
        $state.go("upload");
    }



    $interval(function(){
        $(".process").removeClass("dashed");
        $(".process."+$scope.processNames[$scope.currentProcess++]).addClass("dashed");
        if($scope.currentProcess==$scope.processNames.length){
            $scope.currentProcess=0;
        }
    },3000);

    $scope.animateProcess = function(){

        angular.element("#process-list li").addClass('bounce-in-up');
    }
    $scope.animateDiscount = function(){

            angular.element("#discount-list li").addClass('bounce-in-up');
    }

}]);