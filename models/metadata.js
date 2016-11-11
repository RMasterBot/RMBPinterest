function Metadata(metadata) {
  this.metadata = metadata;
}

Metadata.prototype.getJson = function() {
  return this.metadata;
};

Metadata.prototype.getArticle = function() {
  return this.metadata.article;
};

Metadata.prototype.getLink = function() {
  return this.metadata.link;
};

module.exports = Metadata;