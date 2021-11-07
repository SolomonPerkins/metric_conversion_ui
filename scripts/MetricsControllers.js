var app = angular.module('MetricsModule');

var MetricsController = function ($scope, apiService) {
    $scope.submitted = false;
    $scope.isLoading = false
    $scope.errorMessage = "";
    $scope.units = [];
    $scope.list = [];
    $scope.value = 0;
    $scope.to = "";
    $scope.from = "";
    $scope.result = null;

    var template = {
        student: {
            name: "",
            answer: 0
        },
        value: 0,
        to: {},
        from: {},
        selected: {
            to: {},
            from: {}
        },
        result: 0,
        message: ""
    };

    frow = {};
    angular.copy(template, frow)
    $scope.dataset = [frow]; //Initialize it to a default state.
    
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
        $scope.submitted = true;

        //Prepare data before submitting
        $scope.dataset.forEach(element => {
            //    
        });

        apiService.convert($scope.dataset).then(response => {
            $scope.isLoading = false
            if(response.success) {
                response.data.forEach(function(data, index) {
                    $scope.dataset[index].result = data.result;
                });
            } else {
                $scope.errorMessage = response.message;
            }
        });
    }

    $scope.addRow = function() {
        nrow = {};
        angular.copy(template, nrow);
        $scope.dataset.push(nrow);
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
        let tmpl = {};
        angular.copy(template, tmpl);
        $scope.dataset = [tmpl];

    }

    $scope.changeSelection = function(opt, val) {
        if(! val && ! val.abbr) {
            return;
        }
        opt = val;
    }
}

app.controller('MetricsController', MetricsController);
