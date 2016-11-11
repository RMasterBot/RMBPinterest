function Board(board) {
  this.board = board;
}

Board.prototype.getJson = function() {
  return this.board;
};

Board.prototype.getId = function() {
  return this.board.id;
};

Board.prototype.getName = function() {
  return this.board.name;
};

Board.prototype.getUrl = function() {
  return this.board.url;
};

Board.prototype.getDescription = function() {
  return this.board.description;
};

Board.prototype.getCreator = function() {
  return new User(this.board.creator);
};

Board.prototype.getCreatorJson = function() {
  return this.board.creator;
};

Board.prototype.getCreatedAt = function() {
  return this.board.created_at;
};

Board.prototype.getTimestamp = function() {
  return new Date(this.board.created_at.replace('+0000 ', '')).getTime();
};

Board.prototype.getLocalTimestamp = function() {
  return new Date(this.board.created_at).getTime();
};

Board.prototype.getCounts = function() {
  return this.board.counts;
};

Board.prototype.getCountPins = function() {
  return this.board.counts.pins;
};

Board.prototype.getCountCollaborators = function() {
  return this.board.counts.collaborators;
};

Board.prototype.getCountFollowers = function() {
  return this.board.counts.followers;
};

Board.prototype.getImage = function() {
  for(images in this.board.image) {
    return this.board.image[images].url || '';
  }

  return '';
};

Board.prototype.getImages = function() {
  var img = [];

  for(images in this.board.image) {
    if(this.board.image[images].url !== null) {
      img.push(this.board.image[images].url);
    }
  }

  return img;
};

Board.prototype.getImageJson = function() {
  return this.board.image;
};

Board.prototype.getPrivacy = function() {
  return this.board.privacy;
};

Board.prototype.getReason = function() {
  return this.board.reason;
};

module.exports = Board;