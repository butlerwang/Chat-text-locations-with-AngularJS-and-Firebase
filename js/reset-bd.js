var refResetBD = new Firebase('https://test-helloumi.firebaseio.com/messages/1/');

function resetOriginalBD() {
  refResetBD.set({ "messages" : [ null, {
    "author" : "Umi",
    "message" : "Hola que haces?", "timestamp" : 1459440831, "type" : "text"
  }, {
    "author" : "Hello",
    "latitude" : 39.7147865295, "longitude" : -0.350031495094, "timestamp" : 1459440600, "type" : "location"
  }, {
    "author" : "Umi",
    "latitude" : 30.000023123, "longitude" : 1.3432422442, "timestamp" : 1459445000, "type" : "location"
  }]});

  console.log("reset BD done!")
};