/**
 * Created by Mithun.Das on 12/8/2015.
 */
appModule.factory('PhotoService', ["$rootScope","$http","$q","$log", function($rootScope, $http, $q,$log){
    var apiContext = $rootScope.apiContext;

    return{
        getPricing : function(){

            var deferred = $q.defer();

            if($rootScope.state && $rootScope.state.formats){
                deferred.resolve($rootScope.state.formats);
            }else{
                $http.get(apiContext+"/api/photo/pricing")
                    .success(function (data){
                        $rootScope.state =  $rootScope.state||{};
                        $rootScope.state.formats = data;
                        $rootScope.state.formatMap={};
                        angular.forEach(data,function(f){
                            $rootScope.state.formatMap[f.frameSize] = f;
                        });
                        deferred.resolve(data);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        },
        saveCart: function(cart){
            var tempCart = {uuid:$rootScope.state.user.uuid+"x", products:[]};
            angular.forEach(cart, function(item){
                tempCart.products.push({imgId: item.imgId, imgSrc: item.imgSrc, frameSize: item.format.frameSize, price: item.format.price, quantity: item.quantity});
            });
            $log.debug(tempCart);

            var deferred = $q.defer();

            $http.post($rootScope.apiContext + "/api/order/cart", tempCart)
                .success(function (data){

                    deferred.resolve(data);
                })
                .error(function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        deletePhoto : function(imgId){
            var deferred = $q.defer();
            var uuid = $rootScope.state.user ? $rootScope.state.user.uuid:undefined;

            $http.post($rootScope.apiContext + "/api/photo/delete/"+imgId, {uuid:uuid})
                .success(function (data){

                    deferred.resolve(data);
                })
                .error(function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        },
        getGallery : function(){
            var deferred = $q.defer();
            var uuid = $rootScope.state.user ? $rootScope.state.user.uuid:undefined;

            $http.get($rootScope.apiContext + "/api/photo/gallery/"+uuid)
                .success(function (data){

                    deferred.resolve(data);
                })
                .error(function(err){
                    deferred.reject(err);
                });

            return deferred.promise;
        }
    }

}]);
