// define our app and dependencies (remember to include firebase!)
var app = angular.module("chatApp", ["firebase"]);

// this factory returns a synchronized array of chat messages
app.factory("chatMessages", ["$firebaseArray",
  function($firebaseArray) {
    // create a reference to the database location where we will store our data
    var ref = new Firebase("https://test-helloumi.firebaseio.com/messages/1/messages/");

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages",
  // we pass our new chatMessages factory into the controller
  function($scope, chatMessages) {
    $scope.user = "Chris";
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    // we add chatMessages array to the scope to be used in our ng-repeat
    $scope.messages = chatMessages;

    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
      $scope.messages.$add({
        author: $scope.user,
        message: $scope.message,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        type: "text"
      });

      // reset the message input
      $scope.message = "";
    };

    $scope.addLocation = function(position) {
      $scope.messages.$add({
        author: $scope.user,
        latitude: position.lat,
        longitude: position.lng,
        timestamp: Firebase.ServerValue.TIMESTAMP,
        type: "location"
      });
    };

    $scope.shareLocation = function() {
      var position = mainMap.getCenter().toJSON();
      $scope.addLocation(position);
    };

    $scope.autoScroll = function() {
      $('.msg-panel-body').scrollTop($('.msg-panel-body')[0].scrollHeight)
    }

    // if the messages array are empty, add something for fun!
    $scope.messages.$loaded(function() {
      if ($scope.messages.length === 0) {
        $scope.messages.$add({
          author: "Firebase Docs",
          message: "Hello world!",
          timestamp: Date.now(),
          type: "text"
        });
      }
    });
  }
]);

app.directive('ngScrollBottom', function () {
  return {
    restrict: 'A',
    scope: {
      ngScrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('ngScrollBottom', function (newValue) {
        if (newValue)
        {
          $(element).scrollTop($(element)[0].scrollHeight);
        }
      });
    }
  };
});

app.directive('ngMap', function () {
  return {
    restrict: 'E',
    link: function ($scope) {
      var msg = $scope.$parent.message;
      initMap({lat: msg.latitude, lng: msg.longitude}, msg.timestamp);
    }
  };
});

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});