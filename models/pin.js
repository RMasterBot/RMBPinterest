var User = require(__dirname + '/user.js');
var Board = require(__dirname + '/board.js');
var Attribution = require(__dirname + '/attribution.js');
var Metadata = require(__dirname + '/metadata.js');
/**
 * Pin Model
 * @class Pin
 * @param {Pin~Json} pin json of the pin
 * @constructor
 */
function Pin(pin) {
  this.pin = pin;
}

/**
 * @return {Pin~Json}
 */
Pin.prototype.getJson = function() {
  return this.pin;
};

/**
 * @return {string}
 */
Pin.prototype.getId = function() {
  return this.pin.id;
};

/**
 * @return {string}
 */
Pin.prototype.getLink = function() {
  return this.pin.link;
};

/**
 * @return {string}
 */
Pin.prototype.getOriginalLink = function() {
  return this.pin.original_link;
};

/**
 * @return {string}
 */
Pin.prototype.getUrl = function() {
  return this.pin.url;
};

/**
 * @return {User}
 */
Pin.prototype.getCreator = function() {
  return new User(this.pin.creator);
};

/**
 * @return {User~Json}
 */
Pin.prototype.getCreatorJson = function() {
  return this.pin.creator;
};

/**
 * @return {Board}
 */
Pin.prototype.getBoard = function() {
  return new Board(this.pin.board);
};

/**
 * @return {Board~Json}
 */
Pin.prototype.getBoardJson = function() {
  return this.pin.board;
};

/**
 * @return {string}
 */
Pin.prototype.getCreatedAt = function() {
  return this.pin.created_at;
};

/**
 * @return {Number}
 */
Pin.prototype.getTimestamp = function() {
  return new Date(this.pin.created_at.replace('+0000 ', '')).getTime();
};

/**
 * @return {Number}
 */
Pin.prototype.getLocalTimestamp = function() {
  return new Date(this.pin.created_at).getTime();
};

/**
 * @return {string}
 */
Pin.prototype.getNote = function() {
  return this.pin.note;
};

/**
 * @return {string}
 */
Pin.prototype.getColor = function() {
  return this.pin.color;
};

/**
 * @return {Pin~CountJson}
 */
Pin.prototype.getCounts = function() {
  return this.pin.counts;
};

/**
 * @return {Number}
 */
Pin.prototype.getCountLikes = function() {
  return this.pin.counts.likes;
};

/**
 * @return {Number}
 */
Pin.prototype.getCountComments = function() {
  return this.pin.counts.comments;
};

/**
 * @return {Number}
 */
Pin.prototype.getCountRepins = function() {
  return this.pin.counts.repins;
};

/**
 * @return {string}
 */
Pin.prototype.getMedia = function() {
  return this.pin.media.type;
};

/**
 * @return {boolean}
 */
Pin.prototype.isImage = function() {
  return this.pin.media.type === "image";
};

/**
 * @return {boolean}
 */
Pin.prototype.isVideo = function() {
  return this.pin.media.type === "video";
};

/**
 * @return {string}
 */
Pin.prototype.getVideo = function() {
  if(this.isVideo()) {
    return this.getAttributionUrl();
  }

  return '';
};

/**
 * @return Attribution
 */
Pin.prototype.getAttribution = function() {
  return new Attribution(this.pin.attribution);
};

/**
 * @return {string}
 */
Pin.prototype.getAttributionTitle = function() {
  if(this.pin.attribution) {
    return this.pin.attribution.title;
  }

  return '';
};

/**
 * @return {string}
 */
Pin.prototype.getAttributionUrl = function() {
  if(this.pin.attribution) {
    return this.pin.attribution.url;
  }

  return '';
};

/**
 * @return {string}
 */
Pin.prototype.getAttributionAuthorName = function() {
  if(this.pin.attribution) {
    return this.pin.attribution.author_name;
  }

  return '';
};

/**
 * @return {string}
 */
Pin.prototype.getAttributionAuthorUrl = function() {
  if(this.pin.attribution) {
    return this.pin.attribution.author_url;
  }

  return '';
};

/**
 * @return {string}
 */
Pin.prototype.getAttributionProviderName = function() {
  if(this.pin.attribution) {
    return this.pin.attribution.provider_name;
  }

  return '';
};

/**
 * @return {string}
 */
Pin.prototype.getAttributionProviderIconUrl = function() {
  if(this.pin.attribution) {
    return this.pin.attribution.provider_icon_url;
  }

  return '';
};

/**
 * @return {string}
 */
Pin.prototype.getAttributionProviderFaviconUrl = function() {
  if(this.pin.attribution) {
    return this.pin.attribution.provider_favicon_url;
  }

  return '';
};

/**
 * @return {Attribution~Json}
 */
Pin.prototype.getAttributionJson = function() {
  return this.pin.attribution;
};

/**
 * @return {string}
 */
Pin.prototype.getImage = function() {
  var images;

  //noinspection LoopStatementThatDoesntLoopJS
  for(images in this.pin.image) {
    return this.pin.image[images].url || '';
  }

  return '';
};

/**
 * @return {string[]}
 */
Pin.prototype.getImages = function() {
  var img = [];
  var images;

  for(images in this.pin.image) {
    if(this.pin.image[images].url !== null) {
      img.push(this.pin.image[images].url);
    }
  }

  return img;
};

/**
 * @return {Pin~ImageJson}
 */
Pin.prototype.getImageJson = function() {
  return this.pin.image;
};

/**
 * @return Metadata
 */
Pin.prototype.getMetadata = function() {
  return new Metadata(this.pin.metadata);
};

/**
 * @return {Metadata~Json}
 */
Pin.prototype.getMetadataJson = function() {
  return this.pin.metadata;
};

module.exports = Pin;

/**
 * Pin Json
 * @typedef {Object} Pin~Json
 * @property {string} id
 * @property {string} link
 * @property {string} original_link
 * @property {string} url
 * @property {User~Json} creator
 * @property {Board~Json} board
 * @property {string} created_at
 * @property {string} note
 * @property {string} color
 * @property {Pin~CountJson} counts
 * @property {Pin~MediaJson} media
 * @property {Attribution~Json} attribution
 * @property {Pin~ImageJson} image
 * @property {Metadata~Json} metadata
 */
/**
 * Pin Count Json
 * @typedef {Object} Pin~CountJson
 * @property {Number} likes
 * @property {Number} comments
 * @property {Number} repins
 */
/**
 * Pin Media Json
 * @typedef {Object} Pin~MediaJson
 * @property {string} type
 */
/**
 * Pin Image Json
 * @typedef {Object} Pin~ImageJson
 * @property {Pin~ImageDetailJson[]} image size
 */
/**
 * Board Image Detail Json
 * @typedef {Object} Pin~ImageDetailJson
 * @property {string} url
 * @property {Number} width
 * @property {Number} height
 */