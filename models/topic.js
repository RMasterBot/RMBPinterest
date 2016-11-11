function Topic(topic) {
  this.topic = topic;
}

Topic.prototype.getJson = function() {
  return this.topic;
};

Topic.prototype.getId = function() {
  return this.topic.id;
};

Topic.prototype.getName = function() {
  return this.topic.name;
};

module.exports = Topic;