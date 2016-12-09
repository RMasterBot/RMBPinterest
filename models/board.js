var User = require(__dirname + '/user.js');
/**
 * Board Model
 * @class Board
 * @param {Board~Json} board json of the board
 * @constructor
 */
function Board(board) {
  this.board = board;
}

/**
 * @return {Board~Json}
 */
Board.prototype.getJson = function() {
  return this.board;
};

/**
 * @return {string}
 */
Board.prototype.getId = function() {
  return this.board.id;
};

/**
 * @return {string}
 */
Board.prototype.getName = function() {
  return this.board.name;
};

/**
 * @return {string}
 */
Board.prototype.getUrl = function() {
  return this.board.url;
};

/**
 * @return {string}
 */
Board.prototype.getDescription = function() {
  return this.board.description;
};

/**
 * @return {User}
 */
Board.prototype.getCreator = function() {
  return new User(this.board.creator);
};

/**
 * @return {User~Json}
 */
Board.prototype.getCreatorJson = function() {
  return this.board.creator;
};

/**
 * @return {string}
 */
Board.prototype.getCreatedAt = function() {
  return this.board.created_at;
};

/**
 * @return {Number}
 */
Board.prototype.getTimestamp = function() {
  return new Date(this.board.created_at.replace('+0000 ', '')).getTime();
};

/**
 * @return {Number}
 */
Board.prototype.getLocalTimestamp = function() {
  return new Date(this.board.created_at).getTime();
};

/**
 * @return {Board~CountJson}
 */
Board.prototype.getCounts = function() {
  return this.board.counts;
};

/**
 * @return {Number}
 */
Board.prototype.getCountPins = function() {
  return this.board.counts.pins;
};

/**
 * @return {Number}
 */
Board.prototype.getCountCollaborators = function() {
  return this.board.counts.collaborators;
};

/**
 * @return {Number}
 */
Board.prototype.getCountFollowers = function() {
  return this.board.counts.followers;
};

/**
 * @return {string}
 */
Board.prototype.getImage = function() {
  var images;

  //noinspection LoopStatementThatDoesntLoopJS
  for(images in this.board.image) {
    return this.board.image[images].url || '';
  }

  return '';
};

/**
 * @return {string[]}
 */
Board.prototype.getImages = function() {
  var img = [];
  var images;

  for(images in this.board.image) {
    if(this.board.image[images].url !== null) {
      img.push(this.board.image[images].url);
    }
  }

  return img;
};

/**
 * @return {Board~ImageJson}
 */
Board.prototype.getImageJson = function() {
  return this.board.image;
};

/**
 * @return {string}
 */
Board.prototype.getPrivacy = function() {
  return this.board.privacy;
};

/**
 * @return {?string}
 */
Board.prototype.getReason = function() {
  return this.board.reason;
};

module.exports = Board;

/**
 * Board Json
 * @typedef {Object} Board~Json
 * @property {string} id
 * @property {string} name
 * @property {string} url
 * @property {string} description
 * @property {User~Json} creator
 * @property {string} created_at
 * @property {Board~CountJson} counts
 * @property {Board~ImageJson} image
 * @property {string} privacy
 * @property {?string} reason
 */
/**
 * Board Count Json
 * @typedef {Object} Board~CountJson
 * @property {Number} pins
 * @property {Number} collaborators
 * @property {Number} followers
 */
/**
 * Board Image Json
 * @typedef {Object} Board~ImageJson
 * @property {Board~ImageDetailJson[]} image size
 */
/**
 * Board Image Detail Json
 * @typedef {Object} Board~ImageDetailJson
 * @property {string} url
 * @property {Number} width
 * @property {Number} height
 */