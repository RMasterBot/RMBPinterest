/**
 * Topic Model
 * @class Topic
 * @param {Topic~Json} topic json of the topic
 * @constructor
 */
function Topic(topic) {
  this.topic = topic;
}

/**
 * @return {Topic~Json}
 */
Topic.prototype.getJson = function() {
  return this.topic;
};

/**
 * @return {string}
 */
Topic.prototype.getId = function() {
  return this.topic.id;
};

/**
 * @return {string}
 */
Topic.prototype.getName = function() {
  return this.topic.name;
};

module.exports = Topic;

/**
 * Topic Json
 * @typedef {Object} Topic~Json
 * @property {string} id
 * @property {string} name
 */
