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
        }
    }

}]);
