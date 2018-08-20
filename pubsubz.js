var topics = {},
  subUid = -1,
  pubsubz = {};

pubsubz.publish = function(topic, args) {
  if (!topics[topic]) {
    return false;
  }

  setTimeout(function() {
    var subscribers = topics[topic],
      len = subscribers ? subscribers.length : 0;

    while (len--) {
      var temp = subscribers[len];
      temp.func(topic, args);
      if (temp.once) {
        pubsubz.unsubscribe(temp.token);
      }
    }
  }, 0);

  return true;
};

pubsubz.subscribe = function(topic, func, once) {
  if (!topics[topic]) {
    topics[topic] = [];
  }

  var token = (++subUid).toString();
  topics[topic].push({
    token: token,
    func: func,
    once: !!once
  });
  return token;
};

pubsubz.unsubscribe = function(token) {
  for (var m in topics) {
    if (topics[m]) {
      for (var i = 0, j = topics[m].length; i < j; i++) {
        if (topics[m][i].token === token) {
          topics[m].splice(i, 1);
          return token;
        }
      }
    }
  }
  return false;
};

module.exports = pubsubz;
