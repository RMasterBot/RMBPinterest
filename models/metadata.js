/**
 * Metadata Model
 * @class Metadata
 * @param {Metadata~Json} metadata json of the metadata
 * @constructor
 */
function Metadata(metadata) {
  this.metadata = metadata;
}

/**
 * @return {Metadata~Json|*}
 */
Metadata.prototype.getJson = function() {
  return this.metadata;
};

/**
 * @return {Metadata~ArticleJson}
 */
Metadata.prototype.getArticle = function() {
  return this.metadata.article;
};

/**
 * @return {Metadata~MovieJson}
 */
Metadata.prototype.getMovie = function() {
  return this.metadata.movie;
};

/**
 * @return {Metadata~LinkJson}
 */
Metadata.prototype.getLink = function() {
  return this.metadata.link;
};

module.exports = Metadata;

/**
 * Metadata Json
 * @typedef {Object} Metadata~Json
 * @property {Metadata~ArticleJson} [article]
 * @property {Metadata~MovieJson} [movie]
 * @property {Metadata~LinkJson} [link]
 */
/**
 * Metadata Article Json
 * @typedef {Object} Metadata~ArticleJson
 * @property {string} published_at
 * @property {string} description
 * @property {string} name
 * @property {Metadata~GenericNameJson[]} authors
 */
/**
 * Metadata Link Json
 * @typedef {Object} Metadata~LinkJson
 * @property {string} locale
 * @property {string} title
 * @property {string} site_name
 * @property {string} description
 * @property {string} favicon
 */
/**
 * Metadata Movie Json
 * @typedef {Object} Metadata~MovieJson
 * @property {?string} rating
 * @property {Metadata~GenericNameJson[]} directors
 * @property {Metadata~GenericNameJson[]} actors
 * @property {string} name
 * @property {?string} published_at
 */
/**
 * Metadata Generic Name
 * @typedef {Object} Metadata~GenericNameJson
 * @property {string} name
 */