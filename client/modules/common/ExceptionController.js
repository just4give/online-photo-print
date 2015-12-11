/**
 * Created by Mithun.Das on 12/8/2015.
 */
appModule.controller("LoginController",["$scope","$rootScope","$log","$modal", "$interval",function($scope,$rootScope,$log,$modal,$interval){

    $scope.$on('api_error', function (event, data) {
        modal = $modal({scope: { modalErrorMessage: 'There was an error processing your request. Please try again.'}, templateUrl: 'modules/common/tmpl/modal/api-error-modal.html', show: true});
    });
}]);
