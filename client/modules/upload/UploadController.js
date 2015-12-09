/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("UploadController",["$scope","$rootScope","$log","$modal","$state", "$interval","PhotoService",function($scope,$rootScope,$log,$modal,$state,$interval,PhotoService){

    $scope.totalPhoto = 0;
    $scope.imageBag =[];
    $scope.totalPrice=0;


    PhotoService.getPricing().then(function(data){
        $scope.formats = data;
    },function(err){
        $log.debug(err);
        $rootScope.$broadcast('api_error',err);
    });

    $scope.increaseQuantity = function(m){
        m.quantity = m.quantity+1;
        $scope.totalPrice += m.format.price;
        $scope.totalPhoto++
    }

    $scope.decreaseeQuantity = function(m){
        if(m.quantity >0 ) {
            m.quantity = m.quantity - 1;
            $scope.totalPrice -= m.format.price;
            $scope.totalPhoto--;
        }
    }

    $scope.deleteImage = function($index){
        $log.debug("image deleted");
    }

    $scope.uploadImage = function(){
        var uploadedImage = {
            imgSrc: "http://placekitten.com/60"+ ($scope.imageBag.length+1)+"/300"
        }
        $scope.imageBag.push(uploadedImage);
    }

    $scope.checkout = function(){
        if($scope.totalPhoto >0){
            var cartImages = [];
            angular.forEach($scope.imageBag,function(product){
                if(product.quantity > 0){
                    cartImages.push(product);
                }
            });

            $rootScope.cartImages = cartImages;
            $state.go("checkout")
        }


    }

    $scope.updateTotal = function(){

        $scope.totalPrice=0;
        angular.forEach($scope.imageBag, function(m){
            $scope.totalPrice  += m.format.price* m.quantity;
        })
    }

}]);