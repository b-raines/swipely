var swipelyApp = angular.module('swipelyApp', []);
 
swipelyApp.controller('EmployeeCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('api/employees').success(function(data) {
      $scope.employees = data;
      console.log($scope.employees);
    });
 
  }]);