angular.module('todoCtrl', []).controller('todoCtrl', function($scope, $http) {


    $scope.snackBar = function(msg) {
        $scope.snackHead = msg;
        var x = document.getElementById("snackbar")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    }

    $scope.snackBarError = function(msg) {
        $scope.snackHead = msg;
        var x = document.getElementById("snackBarError")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    }

    $scope.post  = function(url, data) {

        $http.post(url, data)
        .then(function(resp) {
            if (resp.data.success) {
                $scope.snackBar('Succesful');
                $scope.getDefaultObj();
            } else {
                $scope.snackBarError('Something is wrong');
            }
            /* Success */
           
        }, function(resp) {

            /* Failure */
            
        });
        
        // $scope.$apply();

    };

    $scope.getDefaultObj = function() {
        $scope.employeeData = {
            firstName : "",
            lastName : "",
            email : "",
            password : "",

        };
    };

    $scope.getDefaultObj();
    
    
    var isString = function (x) {
      return Object.prototype.toString.call(x) === "[object String]"
    }

    var isEmailValid = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    var isNumber = function(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };

    $scope.addMore = function(employeeData) {

        console.log(employeeData);
        if (!isString(employeeData.firstName)) {
            $scope.snackBarError("Only characters is allowed in First Name");
            return;
        }

        if (!isString(employeeData.lastName)) {
            $scope.snackBarError("Only characters is allowed in Lst Name");
            return;
        }

        if (!isEmailValid(employeeData.email)) {
            $scope.snackBarError("Please enter a valid Email address");
            return;
        }

        if (!(employeeData.password)) {
            $scope.snackBarError("Only numbers are allowed in Password");
            return;
        }

        if ((employeeData.password.length < 8)) {
            $scope.snackBarError("Password - Must be at least 8 characters long");
            return;
        }

        if (!employeeData.firstName || !employeeData.lastName ||
            !employeeData.email || !employeeData.password) {
            $scope.snackBarError("All fields are Mandatory");
            return;
        }

        
        var obj = {
            'data' : employeeData,
            'date' : Date.now()
        };
        
        $scope.post('/saveDataManual', obj);
    };

});