/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("UploadController",["$scope","$rootScope","$log","$modal","$state", "$interval","PhotoService","localStorageService","Upload",
    function($scope,$rootScope,$log,$modal,$state,$interval,PhotoService,localStorageService,Upload){

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
            imgSrc: "http://placekitten.com/60"+ ($scope.imageBag.length+1)+"/300",
            imgId:$scope.generateId()
        }
        $scope.imageBag.push(uploadedImage);
    }

    $scope.upload = function(file){



        if(!file ||file.$error){
            return;
        }
        $log.debug(file.$error);

        Upload.upload({
            url: '/api/photo/upload',
            method: 'POST',
            file:file,
            data: {'username': 'john'}
        }).then(function (resp) {

            $log.debug(resp.data);


            $scope.imageBag.push({
                imgSrc: resp.data.imgSrc,
                imgId:$scope.generateId()
            });

        }, function (resp) {
            $log.debug('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $log.debug('progress: ' + progressPercentage + '% ' );
        });
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
            localStorageService.set("cart", $rootScope.cartImages );
            $state.go("checkout")
        }


    }

    $scope.updateTotal = function(){

        $scope.totalPrice=0;
        angular.forEach($scope.imageBag, function(m){
            $scope.totalPrice  += m.format.price* m.quantity;
        })
    }

    $scope.generateId = function(){
        var id = "8-"+Math.floor((Math.random() * 100) + 1)+"-"+Math.floor((Math.random() * 100) + 1);
        return id;
    }
}]);