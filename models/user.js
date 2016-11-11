function User(user) {
  this.user = user;
}

User.prototype.getJson = function() {
  return this.user;
};

User.prototype.getId = function() {
  return this.user.id;
};

User.prototype.getUsername = function() {
  return this.user.username;
};

User.prototype.getFirstName = function() {
  return this.user.first_name;
};

User.prototype.getLastName = function() {
  return this.user.last_name;
};

User.prototype.getBio = function() {
  return this.user.bio;
};

User.prototype.getCreatedAt = function() {
  return this.user.created_at;
};

User.prototype.getTimestamp = function() {
  return new Date(this.user.created_at.replace('+0000 ', '')).getTime();
};

User.prototype.getLocalTimestamp = function() {
  return new Date(this.user.created_at).getTime();
};

User.prototype.getCounts = function() {
  return this.user.counts;
};

User.prototype.getCountPins = function() {
  return this.user.counts.pins;
};

User.prototype.getCountFollowing = function() {
  return this.user.counts.following;
};

User.prototype.getCountFollowers = function() {
  return this.user.counts.followers;
};

User.prototype.getCountBoards = function() {
  return this.user.counts.boards;
};

User.prototype.getCountLikes = function() {
  return this.user.counts.likes;
};

User.prototype.getImage = function() {
  for(images in this.user.image) {
    return this.user.image[images].url || '';
  }

  return '';
};

User.prototype.getImages = function() {
  var img = [];

  for(images in this.user.image) {
    if(this.user.image[images].url !== null) {
      img.push(this.user.image[images].url);
    }
  }

  return img;
};

User.prototype.getImageJson = function() {
  return this.user.image;
};

User.prototype.getAccountType = function() {
  return this.user.account_type;
};

User.prototype.getUrl = function() {
  if(this.user.url === undefined) {
    return 'https://www.pinterest.com/' + this.user.username;
  }
  else {
    return this.user.url;
  }
};

module.exports = User;