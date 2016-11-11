function Attribution(attribution) {
  this.attribution = attribution;
}

Attribution.prototype.getJson = function() {
  return this.attribution;
};

Attribution.prototype.getTitle = function() {
  return this.attribution.title;
};

Attribution.prototype.getUrl = function() {
  return this.attribution.url;
};

Attribution.prototype.getAuthorName = function() {
  return this.attribution.author_name;
};

Attribution.prototype.getAuthorUrl = function() {
  return this.attribution.author_url;
};

Attribution.prototype.getProviderName = function() {
  return this.attribution.provider_name;
};

Attribution.prototype.getProviderIconUrl = function() {
  return this.attribution.provider_icon_url;
};

Attribution.prototype.getProviderFaviconUrl = function() {
  return this.attribution.provider_favicon_url;
};

module.exports = Attribution;