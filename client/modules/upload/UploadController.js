/**
 * Created by Mithun.Das on 12/4/2015.
 */
appModule.controller("UploadController",["$scope","$rootScope","$log","$modal","$state", "$interval","PhotoService","localStorageService","Upload","$timeout",
    function($scope,$rootScope,$log,$modal,$state,$interval,PhotoService,localStorageService,Upload,$timeout){

    $scope.totalPhoto = 0;
    $scope.imageBag =[];
    $scope.totalPrice=0;

    $scope.galleryBag =[];

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

    $scope.deleteImage = function(index){
        $log.debug("image deleted "+ index);
        var imgId = $scope.imageBag[index].imgId;
        $log.debug(imgId);
        PhotoService.deletePhoto(imgId)
            .then(function(data){
                $scope.imageBag.splice(index,1);

            },function(err){
                $rootScope.$broadcast('api_error',err);
            });
    }





    $scope.upload = function(file){

        $log.debug('****'+file);

        if(!file ||file.$error){
            $scope.modalErrorMessage = 'Image size can not be more than 10MB';
            return;
        }
        $scope.modalErrorMessage='';
        var uuid = $rootScope.state.user ? $rootScope.state.user.uuid:undefined;

        var newImage = {progress: '0%' };
        $scope.imageBag.push(newImage);

        Upload.upload({
            url: '/api/photo/upload',
            method: 'POST',
            file:file,
            data: {'uuid': uuid}
        }).then(function (resp) {

            $log.debug(resp.data);
            newImage.imgSrc = resp.data.imgSrc;
            newImage.imgId = resp.data.imgId;
            newImage.width = resp.data.width;
            newImage.height = resp.data.height;


        }, function (resp) {
            $log.debug('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            $log.debug('progress: ' + progressPercentage + '% ' );
            newImage.progress = progressPercentage +'%';
        });
        //http://localhost:3000/repo/d9f5acf0-9f98-11e5-85e5-8337cc274d49.JPG

       /* $timeout(function(){
            //newImage.imgSrc = "http://localhost:3000/repo/d9f5acf0-9f98-11e5-85e5-8337cc274d49.JPG";
        },5000);*/
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

    var galleryModal ;
    $scope.openGallery = function(){
        galleryModal = $modal({scope: $scope, templateUrl: 'modules/upload/tmpl/modal/gallery-modal.html', show: true});

    }

    $scope.addImport = function(){
        angular.forEach($scope.galleryBag, function(item){
            if(item.import){
                $scope.imageBag.push(item);
            }

        });
    }
    $scope.deleteImageFromBag = function(index){
        $scope.imageBag.splice(index,1);
    }
    $rootScope.$watch('loggedIn',function(){
            if($rootScope.loggedIn){
                $log.debug('user logged in ');
                PhotoService.getGallery().
                then(function(data){
                    $scope.galleryBag = data;
                },function(err){
                    $rootScope.$broadcast('api_error',err);
                });

            }else{
                $log.debug('user logged out ');
            }

        });


}]);