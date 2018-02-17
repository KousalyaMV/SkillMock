myApp.controller('takeTestCtrl', ['$filter', '$http', '$location', '$routeParams', 'testService', 'authService', function ($filter, $http, $location, $routeParams, testService, authService) {

    var main = this;
    var user;
  
    this.userId = $routeParams.userId;
    

    //function to get the tests 
    this.getTests = function () {

        testService.getTests()
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {
                    if (response.data.data.length == 0) {
                        alert("Sorry! No Test Is Assigned By Admin!!!");
                        $location.path('/dashboard/' + main.userId);
                    } else {
                        main.testArray = response.data.data;
                    }
                }
            }, function errorCallBack(response) {
                alert("Error!! Check console");

            })
    }


}]);
