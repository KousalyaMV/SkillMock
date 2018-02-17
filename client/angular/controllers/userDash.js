myApp.controller('userDashCtrl', ['$filter', '$http', '$location', '$routeParams', 'testService', 'authService', function ($filter, $http, $location, $routeParams, testService, authService) {

    var main = this;

    this.userId = $routeParams.userId;
    //code to get the details or number of tests taken,pending test as average score:
    this.getusertestdetails = function () {
        var userid = $routeParams.userId;
        testService.getusertestdetails(userid)
            .then(function successCallBack(response) {
                if (response.data.error === true) {
                    alert(response.data.message);
                } else {

                    var data = response.data.data;
                    //console.log(data);
                    main.testtakenDetails = data;
                    main.testtakenDetailsforgraph = [];
                    main.testtakenDetailslabels = [];
                    var len = data.length;
                    for(var i=0;i<data.length;i++)
                    {
                            main.testtakenDetailsforgraph.push(data[i].score);
                            main.testtakenDetailslabels.push(data[i].testName)
                    }
                    if (len == 0) {
                        main.testtaken = "No Tests Given";
                        main.averagemarks = "0";
                    } else {
                        var scoreadd = 0;
                        for (var i = 0; i < len; i++) {
                            scoreadd = scoreadd + data[i].score;
                        }
                        main.averagemarks = (scoreadd / len);
                        main.averagemarks=Math.round(main.averagemarks);
                        main.testtaken = data.length;
                    }

                }
            }, function errorCallBack(response) {
                alert("Error!! Check console");

            })


    }
    this.getusertestdetails();
}]);
