/**
 * Created by Mithun.Das on 12/8/2015.
 */
appModule.factory('PhotoService', ["$rootScope","$http","$q", function($rootScope, $http, $q){
    var apiContext = $rootScope.apiContext;

    return{
        getPricing : function(){

            var deferred = $q.defer();

            if($rootScope.state.formats){
                deferred.resolve($rootScope.state.formats);
            }else{
                $http.get(apiContext+"/api/photo/pricing")
                    .success(function (data){
                        $rootScope.state.formats = data;
                        deferred.resolve(data);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });
            }



            return deferred.promise;
        }
    }

}]);
