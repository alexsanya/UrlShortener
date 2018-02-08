(function(){

  var app = angular.module('urlShortener',[]);
  
  app.controller('urlsController', function($scope, $http){
    
    $scope.records = [{
      shortLink: 'abcde',
      fullLink: 'http://some-webpage.com'
    }];
    
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
          fullLink: $scope.fullLink
        });
      })
    };
    
    // Delete Note
    // $scope.delete = function (i) {
    //   var r = confirm("Are you sure you want to delete this link?");
    //   if (r == true) 
    //     $scope.notes.splice(i, 1);
    // };
  
  // End Controller
  });
  
// End Function  
})();
