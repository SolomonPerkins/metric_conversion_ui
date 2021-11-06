// NOTE: No array -> we are not creating a module
var app = angular.module('MetricsModule');
var apiHost = "http://localhost:3000";
var apiPath = "/api/v1";

var apiService = function ($http) {
    
    //Handle fetching measurement types
    var getMeasures = function () {
        return $http.get(`${apiHost}${apiPath}/measures`).then(response => {
            return response.data;
        }, error => {
            console.error("Failed due to error: ", error)
            return {success: false}
        });
    }

    //Handles fetching the list based on unit type.
    var getListByUnit = function (unit) {
        return $http.get(`${apiHost}${apiPath}/list?unit=${unit}`).then(response => {
            return response.data;
        }, error => {
            console.error("Failed due to error: ", error)
            return {success: false}
        });
    }

    //Does the actual unit conversion.
    var convert = function (payload) {
        return $http.post(`${apiHost}${apiPath}/convert`, payload).then(response => {
            return response.data
        }, error => {
            console.error("Failed due to error: ", error)
            return {success: false}
        });
    }

    return {
        getMeasures,
        getListByUnit,
        convert
    }
}

app.factory('apiService', apiService);






