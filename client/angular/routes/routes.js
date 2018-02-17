myApp.config(['$routeProvider', '$httpProvider','$locationProvider',function ($routeProvider,$httpProvider,$locationProvider) {
//$locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'homeCtrl',
            controllerAs: 'home'

        })
        .when('/contact', {
            templateUrl: 'views/contact.html'
        })
        .when('/Login', {
            templateUrl: 'views/SignIn.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        })

        .when('/Signup', {
            templateUrl: 'views/SignUp.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        })

        .when('/forgotPass', {
            templateUrl: 'views/forgotPass.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        })

        .when('/reset/:token', {
            templateUrl: 'views/resetPass.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        })

        .when('/Admin/:userId', {
            templateUrl: 'views/admin.html',
            controller: 'adminCtrl',
            controllerAs: 'admin'
        })

        .when('/Admin/QuestionInfo/:userId/:testId/:testName', {
            templateUrl: 'views/TestDetails.html',
            controller: 'adminCtrl',
            controllerAs: 'admin'
        })


        .when('/dashboard/:userId', {
            templateUrl: 'views/userDash.html',
            controller: 'userDashCtrl',
            controllerAs: 'dashboard'
        })


        .when('/takeTest/:userId', {
            templateUrl: 'views/takeTest.html',
            controller: 'takeTestCtrl',
            controllerAs: 'takeTest'
        })

         .when('/liveTestFetch/:testId/:userId', {
            templateUrl: 'views/liveTestDet.html',
            controller: 'liveTestCtrl',
            controllerAs: 'liveTest'
        })

         .when('/AllUserTestInfo/:userId', {
            templateUrl: 'views/allUserTestDetails.html',
            controller: 'adminCtrl',
            controllerAs: 'admin'
        })

         .when('/AllUserInfo/:userId', {
            templateUrl: 'views/allUserInfo_Admin.html',
            controller: 'adminCtrl',
            controllerAs: 'admin'
        })
        .otherwise({
            template: '<p></br><h2 align="center" class="well" style="margin: 10%;">404, page not found</br></h2></p>\
		<p align="center"><button align="center"><a href="/" style="color:black">Home</a></button></p>'
        });

}]);
