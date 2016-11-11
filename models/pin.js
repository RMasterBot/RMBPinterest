function Pin(pin) {
  this.pin = pin;
}

Pin.prototype.getJson = function() {
  return this.pin;
};

Pin.prototype.getId = function() {
  return this.pin.id;
};

Pin.prototype.getLink = function() {
  return this.pin.link;
};

Pin.prototype.getOriginalLink = function() {
  return this.pin.original_link;
};

Pin.prototype.getUrl = function() {
  return this.pin.url;
};

Pin.prototype.getCreator = function() {
  return new User(this.pin.creator);
};

Pin.prototype.getCreatorJson = function() {
  return this.pin.creator;
};

Pin.prototype.getBoard = function() {
  return new Board(this.pin.board);
};

Pin.prototype.getBoardJson = function() {
  return this.pin.board;
};

Pin.prototype.getCreatedAt = function() {
  return this.pin.created_at;
};

Pin.prototype.getTimestamp = function() {
  return new Date(this.pin.created_at.replace('+0000 ', '')).getTime();
};

Pin.prototype.getLocalTimestamp = function() {
  return new Date(this.pin.created_at).getTime();
};

Pin.prototype.getNote = function() {
  return this.pin.note;
};

Pin.prototype.getColor = function() {
  return this.pin.color;
};

Pin.prototype.getCounts = function() {
  return this.pin.counts;
};

Pin.prototype.getCountLikes = function() {
  return this.pin.counts.likes;
};

Pin.prototype.getCountComments = function() {
  return this.pin.counts.comments;
};

Pin.prototype.getCountRepins = function() {
  return this.pin.counts.repins;
};

Pin.prototype.getMedia = function() {
  return this.pin.media.type;
};

Pin.prototype.isImage = function() {
  return this.pin.media.type === "image";
};

Pin.prototype.isVideo = function() {
  return this.pin.media.type === "video";
};

Pin.prototype.getVideo = function() {
  if(this.isVideo()) {
    return this.getAttributionUrl();
  }
  return '';
};

Pin.prototype.getAttribution = function() {
  return new Attribution(this.pin.attribution);
};

Pin.prototype.getAttributionTitle = function() {
  if(this.pin.attribution !== null) {
    return this.pin.attribution.title;
  }

  return '';
};

Pin.prototype.getAttributionUrl = function() {
  if(this.pin.attribution !== null) {
    return this.pin.attribution.url;
  }

  return '';
};

Pin.prototype.getAttributionAuthorName = function() {
  if(this.pin.attribution !== null) {
    return this.pin.attribution.author_name;
  }

  return '';
};

Pin.prototype.getAttributionAuthorUrl = function() {
  if(this.pin.attribution !== null) {
    return this.pin.attribution.author_url;
  }

  return '';
};

Pin.prototype.getAttributionProviderName = function() {
  if(this.pin.attribution !== null) {
    return this.pin.attribution.provider_name;
  }

  return '';
};

Pin.prototype.getAttributionProviderIconUrl = function() {
  if(this.pin.attribution !== null) {
    return this.pin.attribution.provider_icon_url;
  }

  return '';
};

Pin.prototype.getAttributionProviderFaviconUrl = function() {
  if(this.pin.attribution !== null) {
    return this.pin.attribution.provider_favicon_url;
  }

  return '';
};

Pin.prototype.getAttributionJson = function() {
  return this.pin.attribution;
};

Pin.prototype.getImage = function() {
  for(images in this.pin.image) {
    return this.pin.image[images].url || '';
  }

  return '';
};

Pin.prototype.getImages = function() {
  var img = [];

  for(images in this.pin.image) {
    if(this.pin.image[images].url !== null) {
      img.push(this.pin.image[images].url);
    }
  }

  return img;
};

Pin.prototype.getImageJson = function() {
  return this.pin.image;
};

Pin.prototype.getMetadata = function() {
  return new Metadata(this.pin.metadata);
};

Pin.prototype.getMetadataJson = function() {
  return this.pin.metadata;
};

module.exports = Pin;