/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("HomeController",["$scope","$rootScope","$log","$modal","$state", "$interval",function($scope,$rootScope,$log,$modal,$state,$interval){

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

}]);