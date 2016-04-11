// define our app and dependencies (remember to include firebase!)
var app = angular.module("sampleApp", ["firebase"]);

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

    $scope.googleMap = function (latitude, longitude, timestamp) {
      initMap(latitude, longitude, timestamp);
      console.log("newmap")
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