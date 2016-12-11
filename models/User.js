/**
 * User Model
 * @class User
 * @param {User~Json} user json of the user
 * @constructor
 */
function User(user) {
  this.user = user;
}

/**
 * @return {User~Json}
 */
User.prototype.getJson = function() {
  return this.user;
};

/**
 * @return {string}
 */
User.prototype.getId = function() {
  return this.user.id;
};

/**
 * @return {string}
 */
User.prototype.getUsername = function() {
  return this.user.username;
};

/**
 * @return {string}
 */
User.prototype.getFirstName = function() {
  return this.user.first_name;
};

/**
 * @return {string}
 */
User.prototype.getLastName = function() {
  return this.user.last_name;
};

/**
 * @return {string}
 */
User.prototype.getBio = function() {
  return this.user.bio;
};

/**
 * @return {string}
 */
User.prototype.getCreatedAt = function() {
  return this.user.created_at;
};

/**
 * @return {Number}
 */
User.prototype.getTimestamp = function() {
  return new Date(this.user.created_at.replace('+0000 ', '')).getTime();
};

/**
 * @return {Number}
 */
User.prototype.getLocalTimestamp = function() {
  return new Date(this.user.created_at).getTime();
};

/**
 * @return {User~CountJson}
 */
User.prototype.getCounts = function() {
  return this.user.counts;
};

/**
 * @return {Number}
 */
User.prototype.getCountPins = function() {
  return this.user.counts.pins;
};

/**
 * @return {Number}
 */
User.prototype.getCountFollowing = function() {
  return this.user.counts.following;
};

/**
 * @return {Number}
 */
User.prototype.getCountFollowers = function() {
  return this.user.counts.followers;
};

/**
 * @return {Number}
 */
User.prototype.getCountBoards = function() {
  return this.user.counts.boards;
};

/**
 * @return {Number}
 */
User.prototype.getCountLikes = function() {
  return this.user.counts.likes;
};

/**
 * @return {string}
 */
User.prototype.getImage = function() {
  var images;

  //noinspection LoopStatementThatDoesntLoopJS
  for(images in this.user.image) {
    return this.user.image[images].url || '';
  }

  return '';
};

/**
 * @return {string[]}
 */
User.prototype.getImages = function() {
  var img = [];
  var images;

  for(images in this.user.image) {
    if(this.user.image[images].url !== null) {
      img.push(this.user.image[images].url);
    }
  }

  return img;
};

/**
 * @return {User~ImageJson}
 */
User.prototype.getImageJson = function() {
  return this.user.image;
};

/**
 * @return {string}
 */
User.prototype.getAccountType = function() {
  return this.user.account_type;
};

/**
 * @return {string}
 */
User.prototype.getUrl = function() {
  return 'https://www.pinterest.com/' + this.user.username;
};

module.exports = User;

/**
 * User Json
 * @typedef {Object} User~Json
 * @property {string} id
 * @property {string} username
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} bio
 * @property {string} created_at
 * @property {User~CountJson} counts
 * @property {User~ImageJson} image
 * @property {string} account_type
 */
/**
 * User Count Json
 * @typedef {Object} User~CountJson
 * @property {Number} pins
 * @property {Number} following
 * @property {Number} followers
 * @property {Number} boards
 * @property {Number} likes
 */
/**
 * User Image Json
 * @typedef {Object} User~ImageJson
 * @property {User~ImageDetailJson[]} image size
 */
/**
 * User Image Detail Json
 * @typedef {Object} User~ImageDetailJson
 * @property {string} url
 * @property {Number} width
 * @property {Number} height
 */
