/**
 * Created by Mithun.Das on 12/8/2015.
 */
appModule.factory('OrderService', ["$rootScope","$http","$q","$log", function($rootScope, $http, $q,$log){
    var apiContext = $rootScope.apiContext;

    return{

        saveCart: function(cart){
            var tempCart = {uuid:$rootScope.state.user.uuid, products:[]};
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
        getCart: function(){
             var deferred = $q.defer();

            $http.get($rootScope.apiContext + "/api/order/cart/"+$rootScope.state.user.uuid)
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
