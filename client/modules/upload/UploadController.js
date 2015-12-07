/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("UploadController",["$scope","$rootScope","$log","$modal","$state", "$interval",function($scope,$rootScope,$log,$modal,$state,$interval){

    $scope.totalPhoto = 0;
    $scope.imageBag =[{},{},{},{},{},{}];
    $scope.formats = ["9x13 cm","10x13 cm","11x15 cm","13x18 cm","20x30 cm","30x48cm"];

    $scope.increaseQuantity = function(m){
        m.quantity = m.quantity+1;
        $scope.totalPhoto++
    }

    $scope.decreaseeQuantity = function(m){
        if(m.quantity >0 ) {
            m.quantity = m.quantity - 1;
            $scope.totalPhoto--;
        }
    }

    $scope.deleteImage = function($index){
        $log.debug("image deleted");
    }

    $scope.uploadImage = function(){

    }

}]);