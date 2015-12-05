/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("UploadController",["$scope","$rootScope","$log","$modal","$state", "$interval",function($scope,$rootScope,$log,$modal,$state,$interval){

    $scope.imageBag =[{},{},{},{},{},{}];
    $scope.formats = ["9x13 cm","10x13 cm","11x15 cm","13x18 cm","20x30 cm","30x48cm"];

}]);