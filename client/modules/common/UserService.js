/**
 * Created by Mithun.Das on 12/8/2015.
 */
appModule.factory('UserService', ["$rootScope","$http","$q", "$log",function($rootScope, $http, $q,$log){



    return{
        login : function(user){

            var deferred = $q.defer();

                $http.post($rootScope.apiContext + "/api/user/login", user)
                    .success(function (data){

                        deferred.resolve(data);
                    })
                    .error(function(err){
                        deferred.reject(err);
                    });




            return deferred.promise;
        },
        register : function(user){

            var deferred = $q.defer();

            $http.post($rootScope.apiContext + "/api/user/register", user)
                .success(function (data){

                    deferred.resolve(data);
                })
                .error(function(err){
                    deferred.reject(err);
                });




            return deferred.promise;
        },
        saveAddress : function(address){

            var deferred = $q.defer();

            var uuid = $rootScope.state.user ? $rootScope.state.user.uuid:undefined;

            $http.post($rootScope.apiContext + "/api/user/address/"+uuid,address)
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
