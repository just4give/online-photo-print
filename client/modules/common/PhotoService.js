/**
 * Created by Mithun.Das on 12/8/2015.
 */
appModule.factory('PhotoService', ["$rootScope","$http","$q", function($rootScope, $http, $q){
    var apiContext = $rootScope.apiContext;

    return{
        getPricing : function(){
            var deferred = $q.defer();
            $http.get(apiContext+"/api/photo/pricing")
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
