/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("HomeController",["$scope","$rootScope","$log","$modal","$state", function($scope,$rootScope,$log,$modal,$state){

    $scope.gotoUpload = function(){
        $state.go("upload");
    }


}]);