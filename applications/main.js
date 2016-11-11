var Bot = require('../../core/bot.js');

function Pinterest(name, folder, allConfigurations){
  Bot.call(this, name, folder, allConfigurations);

  this.fields = {
    user: ['id', 'username', 'first_name', 'last_name', 'bio', 'created_at', 'counts', 'image', 'account_type'],
    board: ['id', 'name', 'url', 'description', 'creator', 'created_at', 'counts', 'image', 'privacy', 'reason'],
    pin: ['id', 'link', 'original_link', 'url', 'creator', 'board', 'created_at', 'note', 'color', 'counts', 'media', 'attribution', 'image', 'metadata'],
    topic: ['id', 'name']
  };
  this.limit = 1;

  this.validHttpMethods = ["GET","POST","PATCH","DELETE"];
  this.defaultValues = {
    port: 443,
    path: "",
    pathPrefix: "/v1/",
    httpModule: "https",
    hostname: "api.pinterest.com",
    scopes: 'read_public'
  };
}

Pinterest.prototype = new Bot();
Pinterest.prototype.constructor = Pinterest;

Pinterest.prototype.addQueryFields = function(get, obj) {
  if(this.fields[obj] === undefined || this.fields[obj].length < 1) {
    return get;
  }

  var fields = this.fields[obj].join(',');

  if(obj === 'board') {
    fields = fields.replace('creator', 'creator(' + this.fields['user'].join(',') + ')');
  }

  if(obj === 'pin') {
    fields = fields.replace('creator', 'creator(' + this.fields['user'].join(',') + ')');
    fields = fields.replace('board', 'board(' + this.fields['board'].join(',') + ')');
  }

  get.fields = fields;

  return get;
};

Pinterest.prototype.addQueryLimit = function(get) {
  get.limit = this.limit;

  return get;
};

Pinterest.prototype.addQueryAccessToken = function(get) {
  get.access_token = this.accessToken.access_token;

  return get;
};

Pinterest.prototype.getRemainingRequestsFromResult = function(resultFromRequest) {
  return parseInt(resultFromRequest.headers['x-ratelimit-remaining']);
};

Pinterest.prototype.me = function(callback) {
  if(!this.isAccessTokenSetted()) {
    return callback(true, null);
  }

  var that = this;
  var params = {
    method: "GET",
    path: "me/",
    get: {}
  };

  params.get = this.addQueryLimit(params.get);
  params.get = this.addQueryFields(params.get, 'user');
  params.get = this.addQueryAccessToken(params.get);

  this.requestApi(params, function(error, result){
    if(error !== false) {
      callback(error, false);
    }
    else {
      that.updateRemainingRequests(result);
      var data = JSON.parse(result.data);
      var responseData = data.data;
      if(that.useModels && data.data !== null) {
        responseData = new that.models.User(data.data);
      }
      callback(null, responseData);
    }
  });
};

Pinterest.prototype.myBoards = function(callback) {
  if(!this.isAccessTokenSetted()) {
    return callback(true, false);
  }

  var that = this;
  var params = {
    method: "GET",
    path: "me/boards/",
    get: {}
  };

  params.get = this.addQueryLimit(params.get);
  params.get = this.addQueryFields(params.get, 'board');
  params.get = this.addQueryAccessToken(params.get);

  this.requestApi(params, function(error, result){
    if(error !== false) {
      callback(error, null);
    }
    else {
      that.updateRemainingRequests(result);
      var data = JSON.parse(result.data);
      var responseData = data.data;
      if(that.useModels) {
        responseData = [];
        var max = data.data.length;
        for(var i = 0; i < max; i++) {
          responseData[i] = new that.models.Board(data.data[i]);
        }
      }
      callback(null, responseData);
    }
  });
};

Pinterest.prototype.mySuggestedBoards = function(pin, callback) {
  this.isAccessTokenSetted();

  this.callApiV1('GET', 'me/boards/suggested/?' + this.addQueryAccessToken() + '&pin=' + pin + '&' + this.addQueryFields('board'), function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Board(data.data[i]);
      }

      callback(null, data.data);
    }
  });
};

Pinterest.prototype.myLikes = function(parameters, callback) {
  this.isAccessTokenSetted();

  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/likes/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' +  this.addQueryFields('pin') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Pin(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

Pinterest.prototype.myPins = function(parameters, callback) {
  this.isAccessTokenSetted();

  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/pins/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('pin') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Pin(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

Pinterest.prototype.searchMyBoards = function(query, parameters, callback) {
  this.isAccessTokenSetted();

  if(query === undefined || query.trim().length < 1) {
    callback({code:"", message:"query is required and can't be blank"}, null);
    return;
  }

  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/search/boards/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&query=' + query + '&' + this.addQueryFields('board') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Board(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

Pinterest.prototype.searchMyPins = function(query, parameters, callback) {
  this.isAccessTokenSetted();

  if(query === undefined || query.trim().length < 1) {
    callback({code:"", message:"query is required and can't be blank"}, null);
    return;
  }

  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/search/pins/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&query=' + query + '&' + this.addQueryFields('pin') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else{
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Pin(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

Pinterest.prototype.myFollowers = function(parameters, callback) {
  this.isAccessTokenSetted();

  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/followers/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('user') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new User(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

Pinterest.prototype.myFollowingBoards = function(parameters, callback) {
  this.isAccessTokenSetted();

  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/following/boards/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('board') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Board(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

Pinterest.prototype.myFollowingInterests = function(parameters, callback) {
  this.isAccessTokenSetted();

  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/following/interests/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('topic') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Topic(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

Pinterest.prototype.myFollowingUsers = function(parameters, callback) {
  this.isAccessTokenSetted();

  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'me/following/users/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('user') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new User(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

Pinterest.prototype.getBoard = function(board, callback) {
  this.isAccessTokenSetted();

  if(board === undefined || board.trim().length < 1) {
    callback({code:"", message:"board is required"}, null);
    return;
  }

  if(board.indexOf('/') === -1) {
    callback({code:"", message:"board format is incorrect"}, null);
    return;
  }

  this.callApiV1('GET', 'boards/' + board + '/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('board'), function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      callback(null, new Board(data.data));
    }
  });
};

Pinterest.prototype.getPinsInBoard = function(board, parameters, callback) {
  this.isAccessTokenSetted();

  if(board === undefined || board.trim().length < 1) {
    callback({code:"", message:"board is required"}, null);
    return;
  }

  if(board.indexOf('/') === -1) {
    callback({code:"", message:"board format is incorrect"}, null);
    return;
  }

  var queryCursor = '';
  if(parameters && parameters.cursor && parameters.cursor.length > 0) {
    queryCursor = '&cursor=' + parameters.cursor;
  }

  this.callApiV1('GET', 'boards/' + board + '/pins/?' + this.addQueryAccessToken() + '&' + this.addQueryLimit() + '&' + this.addQueryFields('pin') + queryCursor, function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      var max = data.data.length;
      for(var i = 0; i < max; i++) {
        data.data[i] = new Pin(data.data[i]);
      }

      callback(null, data.data, data.page);
    }
  });
};

Pinterest.prototype.getPin = function(pin, callback) {
  this.isAccessTokenSetted();

  if(pin === undefined || pin.trim().length < 1) {
    callback({code:"", message:"pin is required"}, null);
    return;
  }

  this.callApiV1('GET', 'pins/' + pin + '/?' + this.addQueryAccessToken() + '&' + this.addQueryFields('pin'), function(error, data){
    if(error !== false) {
      callback(error, false);
    }
    else {
      data = JSON.parse(data);
      callback(null, new Pin(data.data));
    }
  });
};

Pinterest.prototype.followBoard = function(board, callback) {
  this.isAccessTokenSetted();

  if(board === undefined || board.trim().length < 1) {
    callback({code:"", message:"board is required"}, null);
    return;
  }

  if(board.indexOf('/') === -1) {
    callback({code:"", message:"board format is incorrect"}, null);
    return;
  }

  this.callApiV1('POST', 'me/following/boards/?' + this.addQueryAccessToken() + '&board=' + board, function(error, data){
    if(error !== false) {
      callback(error);
    }
    else {
      data = JSON.parse(data);
      callback(data.data);
    }
  });
};

Pinterest.prototype.followUser = function(user, callback) {
  this.isAccessTokenSetted();

  if(user === undefined || user.trim().length < 1) {
    callback({code:"", message:"user is required"}, null);
    return;
  }

  if(user.indexOf('/') !== -1) {
    callback({code:"", message:"user format is incorrect"}, null);
    return;
  }

  this.callApiV1('POST', 'me/following/users/?' + this.addQueryAccessToken() + '&user=' + user, function(error, data){
    if(error !== false) {
      callback(error);
    }
    else {
      data = JSON.parse(data);
      callback(data.data);
    }
  });
};

Pinterest.prototype.createBoard = function(parameters, callback) {
  this.isAccessTokenSetted();

  if(parameters.name === undefined || parameters.name.trim().length < 1) {
    callback({code:"", message:"board_name is required"}, null);
    return;
  }

  if(parameters.description === undefined) {
    parameters.description = '';
  }

  this.callApiV1('POST', 'boards/?' + this.addQueryAccessToken() + '&' + this.addParameters(parameters), function(error, data){
    if(error !== false) {
      callback(error);
    }
    else {
      data = JSON.parse(data);
      callback(null, new Board(data.data));
    }
  });
};

Pinterest.prototype.createPin = function(parameters, callback) {
  this.isAccessTokenSetted();

  if(parameters.board === undefined || parameters.board.trim().length < 1) {
    callback({code:"", message:"parameters board is required"}, null);
    return;
  }

  if(parameters.board.indexOf('/') === -1) {
    callback({code:"", message:"parameters board format is incorrect"}, null);
    return;
  }

  if(parameters.note === undefined  || parameters.note.trim().length < 1) {
    callback({code:"", message:"parameters note is required"}, null);
    return;
  }

  if(
    (parameters.image === undefined || parameters.image.trim().length < 1)
    && (parameters.image_url === undefined || parameters.image_url.trim().length < 1)
    && (parameters.image_base64 === undefined || parameters.image_base64.trim().length < 1)
  ) {
    callback({code:"", message:"parameters image OR image_url OR image_base64 is required"}, null);
    return;
  }

  if(parameters.link === undefined) {
    parameters.link = '';
  }

  if(parameters.image !== undefined) {
    var subParameters = {
      board: parameters.board,
      note: parameters.note,
      link: parameters.link
    };

    this.callApiV1('POST', 'pins/?' + this.addQueryAccessToken() + '&' + this.addParameters(subParameters), function(error, data){
      if(error !== false) {
        callback(error);
      }
      else {
        data = JSON.parse(data);
        callback(null, new Pin(data.data));
      }
    }, parameters.image);
  }
  else {
    this.callApiV1('POST', 'pins/?' + this.addQueryAccessToken() + '&' + this.addParameters(parameters), function(error, data){
      if(error !== false) {
        callback(error);
      }
      else {
        data = JSON.parse(data);
        callback(null, new Pin(data.data));
      }
    });
  }
};

Pinterest.prototype.updateBoard = function(board, parameters, callback) {
  this.isAccessTokenSetted();

  if(board === undefined || board.trim().length < 1) {
    callback({code:"", message:"board is required"}, null);
    return;
  }

  if(board.indexOf('/') === -1) {
    callback({code:"", message:"board format is incorrect"}, null);
    return;
  }

  this.callApiV1('PATCH', 'boards/' + board + '/?' + this.addQueryAccessToken() + '&' + this.addParameters(parameters), function(error, data){
    if(error !== false) {
      callback(error);
    }
    else {
      data = JSON.parse(data);
      callback(null, new Board(data.data));
    }
  });
};

Pinterest.prototype.updatePin = function(pin, parameters, callback) {
  this.isAccessTokenSetted();

  if(pin === undefined || pin.trim().length < 1) {
    callback({code:"", message:"pin is required"}, null);
    return;
  }

  this.callApiV1('PATCH', 'pins/' + pin + '/?' + this.addQueryAccessToken() + '&' + this.addParameters(parameters), function(error, data){
    if(error !== false) {
      callback(error);
    }
    else {
      data = JSON.parse(data);
      callback(null, new Pin(data.data));
    }
  });
};

Pinterest.prototype.unfollowBoard = function(board, callback) {
  this.isAccessTokenSetted();

  if(board === undefined || board.trim().length < 1) {
    callback({code:"", message:"board is required"}, null);
    return;
  }

  if(board.indexOf('/') === -1) {
    callback({code:"", message:"board format is incorrect"}, null);
    return;
  }

  this.callApiV1('DELETE', 'me/following/boards/' + board + '/?' + this.addQueryAccessToken(), function(error, data){
    if(error !== false) {
      callback(error);
    }
    else {
      data = JSON.parse(data);
      callback(data.data);
    }
  });
};

Pinterest.prototype.unfollowUser = function(user, callback) {
  this.isAccessTokenSetted();

  if(user === undefined || user.trim().length < 1) {
    callback({code:"", message:"user is required"}, null);
    return;
  }

  if(user.indexOf('/') !== -1) {
    callback({code:"", message:"user format is incorrect"}, null);
    return;
  }

  this.callApiV1('DELETE', 'me/following/users/' + user + '/?' + this.addQueryAccessToken(), function(error, data){
    if(error !== false) {
      callback(error);
    }
    else {
      data = JSON.parse(data);
      callback(data.data);
    }
  });
};

Pinterest.prototype.deleteBoard = function(board, callback) {
  this.isAccessTokenSetted();

  if(board === undefined || board.trim().length < 1) {
    callback({code:"", message:"board is required"}, null);
    return;
  }

  if(board.indexOf('/') === -1) {
    callback({code:"", message:"board format is incorrect"}, null);
    return;
  }

  this.callApiV1('DELETE', 'boards/' + board + '/?' + this.addQueryAccessToken(), function(error, data){
    if(error !== false) {
      callback(error);
    }
    else {
      data = JSON.parse(data);
      callback(data.data);
    }
  });
};

Pinterest.prototype.deletePin = function(pin, callback) {
  this.isAccessTokenSetted();

  if(pin === undefined || pin.trim().length < 1) {
    callback({code:"", message:"pin is required"}, null);
    return;
  }

  this.callApiV1('DELETE', 'pins/' + pin + '/?' + this.addQueryAccessToken(), function(error, data){
    if(error !== false) {
      callback(error);
    }
    else {
      data = JSON.parse(data);
      callback(data.data);
    }
  });
};

Pinterest.prototype.getAccessTokenUrl = function(scopes) {
  if(scopes.length < 1) {
    scopes = this.defaultValues.scopes;
  }
  return 'https://api.pinterest.com/oauth/?'
    + 'response_type=code&'
    + 'redirect_uri=' + this.currentConfiguration.callback_url + '&'
    + 'client_id=' + this.currentConfiguration.consumer_key + '&'
    + 'scope=' + scopes;
};

Pinterest.prototype.extractResponseDataForAccessToken = function(req) {
  var query = require('url').parse(req.url, true).query;

  if(query.code === undefined) {
    return null;
  }

  return query.code;
};

Pinterest.prototype.requestAccessToken = function(responseData, callback) {
  var uri = 'grant_type=authorization_code&'
    + 'client_id=' + this.currentConfiguration.consumer_key + '&'
    + 'client_secret=' + this.currentConfiguration.consumer_secret + '&'
    + 'code=' + responseData;

  var params = {
    method: "POST",
    path: 'oauth/token?' + uri
  };

  this.requestApi(params, function(error, result){
    if(error !== false) {
      callback(error, null);
      return;
    }

    if(result.statusCode === 200) {
      callback(false, JSON.parse(result.data));
    }
    else {
      callback(JSON.parse(result.data), false);
    }
  });
};

Pinterest.prototype.getAccessTokenFromAccessTokenData = function(accessTokenData) {
  return accessTokenData.access_token;
};

Pinterest.prototype.getTypeAccessTokenFromAccessTokenData = function(accessTokenData) {
  return accessTokenData.token_type;
};

Pinterest.prototype.getUserForNewAccessToken = function(formatAccessToken, callback) {
  this.setCurrentAccessToken(formatAccessToken.access_token);
  this.me(function(err, user){
    if(err) {
      callback(err, null);
    }
    else {
      var username = (user !== null) ? user.getUsername() : null;
      callback(null, username);
    }
  });
};

Pinterest.prototype.isValidUser = function(user, callback) {
  if(user === undefined || user.trim().length < 1) {
    callback(false);
    return;
  }

  if(user.indexOf('/') !== -1) {
    callback(false);
    return;
  }

  this.checkValid(user, callback);
};

Pinterest.prototype.isValidBoard = function(board, callback) {
  if(board === undefined || board.trim().length < 1) {
    callback(false);
    return;
  }

  if(board.indexOf('/') === -1) {
    callback(false);
    return;
  }

  this.checkValid(board, callback);
};

Pinterest.prototype.checkValid = function(url, callback) {
  this.https.get('https://www.pinterest.com/' + url + '/', function(res) {
    if(res.statusCode === 200) {
      callback(true);
    }
    else {
      callback(false);
    }
  }).on('error', function(e) {
    callback(false);
  });
};

module.exports = Pinterest;