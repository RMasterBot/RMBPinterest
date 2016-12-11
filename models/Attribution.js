/**
 * Attribution Model
 * @class Attribution
 * @param {Attribution~Json} attribution json of the attribution
 * @constructor
 */
function Attribution(attribution) {
  this.attribution = attribution;
}

/**
 * @return {Attribution~Json|*}
 */
Attribution.prototype.getJson = function() {
  return this.attribution;
};

/**
 * @return {string}
 */
Attribution.prototype.getTitle = function() {
  return this.attribution.title;
};

/**
 * @return {string}
 */
Attribution.prototype.getUrl = function() {
  return this.attribution.url;
};

/**
 * @return {string}
 */
Attribution.prototype.getAuthorName = function() {
  return this.attribution.author_name;
};

/**
 * @return {string}
 */
Attribution.prototype.getAuthorUrl = function() {
  return this.attribution.author_url;
};

/**
 * @return {string}
 */
Attribution.prototype.getProviderName = function() {
  return this.attribution.provider_name;
};

/**
 * @return {string}
 */
Attribution.prototype.getProviderIconUrl = function() {
  return this.attribution.provider_icon_url;
};

/**
 * @return {string}
 */
Attribution.prototype.getProviderFaviconUrl = function() {
  return this.attribution.provider_favicon_url;
};

module.exports = Attribution;

/**
 * Attribution Json
 * @typedef {Object} Attribution~Json
 * @property {string} title
 * @property {string} url
 * @property {string} author_name
 * @property {string} author_url
 * @property {string} provider_name
 * @property {string} provider_icon_url
 * @property {string} provider_favicon_url
 */
