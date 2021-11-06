var app = angular.module('MetricsModule', ['ngRoute']);

//Setup the routes for the angular application
var routeProvider = function ($routeProvider) {
    $routeProvider.when("/measure", {
        templateUrl: "fragments/measure.html",
        controller: "MetricsController"
    })
    .otherwise({redirectTo: '/measure'})
}

app.config(routeProvider)
