var app = angular.module('MetricsModule');

var MetricsController = function ($scope, apiService) {
    $scope.isLoading = false
    $scope.errorMessage = "";
    $scope.units = [];
    $scope.list = [];
    $scope.selectedUnit = null;
    $scope.value = 0;
    $scope.to = "";
    $scope.from = "";
    $scope.result = null;

    
    $scope.isLoading = true
    apiService.getMeasures().then(response => {
        $scope.isLoading = false;
        if(response.success) {
            $scope.units = response.data;
        }else {
            $scope.errorMessage = response.message;
        }
    });


    $scope.convert = function () {
        $scope.isLoading = true

        if(!$scope.value && !$scope.from || !$scope.to) {
            $scope.errorMessage = "Please specify the appropriate values before submitting request."
            return;
        }

        var data = {
            value: $scope.value,
            from: $scope.from.abbr,
            to: $scope.to.abbr
        }

        apiService.convert(data).then(response => {
            $scope.isLoading = false
            if(response.success) {
                $scope.result = response.data;
            } else {
                $scope.errorMessage = response.message;
            }
        });
    }

    $scope.getListByUnit = function () {
        $scope.isLoading = true

        apiService.getListByUnit($scope.selectedUnit)
            .then(response => {
                $scope.isLoading = false;
                if(response.success) {
                    $scope.list = response.data;
                }else {
                    $scope.errorMessage = response.message;
                }
            });
    }

    $scope.reset = function() {
        $scope.errorMessage = "";
        $scope.result = "";
    }
}

app.controller('MetricsController', MetricsController);
