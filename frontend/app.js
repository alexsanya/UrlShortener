(function(){

  var app = angular.module('urlShortener',[]);
  
  app.controller('urlsController', function($scope, $http){
    
    $scope.records = [];
    
    $scope.addRecord = function() {
      var data = {
        url: $scope.fullLink
      }
      $http.post('/link/create', data)
      .success(function (data) {
        var domain = window.location.protocol + '//' + window.location.hostname;
        if (window.location.port) domain += ':' + window.location.port;
        $scope.records.push({
          shortLink: domain + '/link/' + data.shortenUrl,
          key: data.key,
          linkId: data.shortenUrl,
          fullLink: $scope.fullLink.substr(0, 90)
        });
      })
    };
    
    $scope.delete = function (i) {
      var r = confirm("Are you sure you want to delete this link?");
      if (r) {
        var record = $scope.records[i];
        $http.delete('/link/' + record.linkId, {
            headers : {
              'x-auth-key': record.key
            }
        })
        .success(function () {
          $scope.records.splice(i, 1);
        })
        
      }
    };
  
  // End Controller
  });
  
// End Function  
})();
