Just another compact library-agnostic Pub/Sub implementation.

### Usage

`npm install psz`

```javascript
var pubsub = require("psz");

var testSubscriber = function(topics, data) {
  console.log(topics + ": " + data);
};

var testSubscription = pubsub.subscribe("example1", testSubscriber);

pubsub.publish("example1", "hello world!");
pubsub.publish("example1", ["test", "a", "b", "c"]);
pubsub.publish("example1", [{ color: "blue" }, { text: "hello" }]);

setTimeout(function() {
  pubsub.unsubscribe(testSubscription);
}, 0);

pubsub.publish("example1", "hello again!");

// subscribe once
pubsub.subscribe(
  "example2",
  function(topics) {
    console.log("once");
  },
  true
);

pubsub.publish("example2", "hi~");

// out of work
pubsub.publish("example2", "hi~ again");
```
