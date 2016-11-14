var Bot = require('../../core/bot.js');

function Pinterest(name, folder, allConfigurations){
  Bot.call(this, name, folder, allConfigurations);

  this.fields = {
    user: ['id', 'username', 'first_name', 'last_name', 'bio', 'created_at', 'counts', 'image', 'account_type'],
    board: ['id', 'name', 'url', 'description', 'creator', 'created_at', 'counts', 'image', 'privacy', 'reason'],
    pin: ['id', 'link', 'original_link', 'url', 'creator', 'board', 'created_at', 'note', 'color', 'counts', 'media', 'attribution', 'image', 'metadata'],
    topic: ['id', 'name']
  };
  this.limit = 100;

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

Pinterest.prototype.apiCall = function(parameters, callback) {
  var that = this;
  var requestParams = {
    method: '',
    path: '',
    get: {},
    post: {},
    files: {}
  };
  var key;
  var errorMessage = 'Something went wrong.';

  if(!this.isAccessTokenSetted()) {
    return callback('Access Token required', null);
  }

  if(parameters.method === undefined) {
    throw this.RError('RMBPinterest-001', 'Method is required');
  }

  if(parameters.path === undefined) {
    throw this.RError('RMBPinterest-002', 'Path is required');
  }

  requestParams.method = parameters.method;
  requestParams.path = parameters.path;
  if(requestParams.path.charAt(requestParams.path.length-1) !== '/') {
    requestParams.path+= '/';
  }

  if(parameters.get !== undefined) {
    for (key in parameters.get) {
      if (parameters.get.hasOwnProperty(key)) {
        requestParams.get[key] = parameters.get[key];
      }
    }
  }

  if(parameters.files !== undefined) {
    for (key in parameters.files) {
      if (parameters.files.hasOwnProperty(key)) {
        requestParams.files[key] = parameters.files[key];
      }
    }
  }

  if(parameters.useLimit !== undefined && parameters.useLimit === true) {
    requestParams.get = this.addQueryLimit(requestParams.get);
  }

  if(parameters.objectFields !== undefined) {
    requestParams.get = this.addQueryFields(requestParams.get, parameters.objectFields);
  }

  requestParams.get = this.addQueryAccessToken(requestParams.get);

  this.requestApi(requestParams, function(error, result){
    if(error !== false) {
      callback(error, false);
    }
    else {
      that.updateRemainingRequests(result);

      var data = JSON.parse(result.data);
      var responseData = data.data;

      if(result.statusCode >= 400) {
        if(data.message !== undefined) {
          errorMessage = data.message;
        }
        callback(errorMessage, false);
        return;
      }
      
      if(that.useModels && data.data !== null && parameters.output !== undefined && parameters.output.model !== undefined) {
        if(parameters.output.isArray !== undefined && parameters.output.isArray === true) {
          var max = data.data.length;
          for(var i = 0; i < max; i++) {
            data.data[i] = new that.models[parameters.output.model](data.data[i]);
          }
        }
        else {
          responseData = new that.models[parameters.output.model](data.data);
        }
      }

      if(parameters.returnCursor !== undefined && parameters.returnCursor === true) {
        callback(null, responseData, data.page);
      }
      else {
        callback(null, responseData);
      }
    }
  });

};

Pinterest.prototype.me = function(callback) {
  var params = {
    path: 'me',
    objectFields: 'user',
    output: {
      model: 'User'
    }
  };

  this.apiGet(params, callback);
};

Pinterest.prototype.myBoards = function(callback) {
  var params = {
    path: 'me/boards',
    objectFields: 'board',
    output: {
      model: 'Board',
      isArray: true
    }
  };

  this.apiGet(params, callback);
};

Pinterest.prototype.mySuggestedBoards = function(pinId, callback) {
  pinId = this.validatePinId(pinId);
  if(pinId === false) {
    callback('Pin is invalid', null);
    return;
  }

  var params = {
    path: 'me/boards/suggested',
    objectFields: 'board',
    output: {
      model: 'Board',
      isArray: true
    },
    get: {
      pin: pinId
    }
  };

  this.apiGet(params, callback);
};

Pinterest.prototype.myLikes = function(parameters, callback) {
  var params = {
    path: 'me/likes',
    objectFields: 'pin',
    useLimit: true,
    output: {
      model: 'Pin',
      isArray: true
    },
    returnCursor: true,
    get: {}
  };

  params.get = this.addQueryCursor(params.get, parameters);

  this.apiGet(params, callback);
};

Pinterest.prototype.myPins = function(parameters, callback) {
  var params = {
    path: 'me/pins',
    objectFields: 'pin',
    useLimit: true,
    output: {
      model: 'Pin',
      isArray: true
    },
    returnCursor: true,
    get: {}
  };

  params.get = this.addQueryCursor(params.get, parameters);

  this.apiGet(params, callback);
  /*
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
  */
};

Pinterest.prototype.searchMyBoards = function(query, parameters, callback) {
  query = this.validateQuery(query);
  if(query === false) {
    callback('Query is invalid', null);
    return;
  }

  var params = {
    path: 'me/search/boards',
    objectFields: 'board',
    useLimit: true,
    output: {
      model: 'Board',
      isArray: true
    },
    returnCursor: true,
    get: {
      query: query
    }
  };

  params.get = this.addQueryCursor(params.get, parameters);

  this.apiGet(params, callback);
  /*
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
  */
};

Pinterest.prototype.searchMyPins = function(query, parameters, callback) {
  query = this.validateQuery(query);
  if(query === false) {
    callback('Query is invalid', null);
    return;
  }

  var params = {
    path: 'me/search/pins',
    objectFields: 'pin',
    useLimit: true,
    output: {
      model: 'Pin',
      isArray: true
    },
    returnCursor: true,
    get: {
      query: query
    }
  };

  params.get = this.addQueryCursor(params.get, parameters);

  this.apiGet(params, callback);
};

Pinterest.prototype.myFollowers = function(parameters, callback) {
  var params = {
    path: 'me/followers',
    objectFields: 'user',
    useLimit: true,
    output: {
      model: 'User',
      isArray: true
    },
    returnCursor: true,
    get: {}
  };

  params.get = this.addQueryCursor(params.get, parameters);

  this.apiGet(params, callback);
};

Pinterest.prototype.myFollowingBoards = function(parameters, callback) {
  var params = {
    path: 'me/following/boards',
    objectFields: 'board',
    useLimit: true,
    output: {
      model: 'Board',
      isArray: true
    },
    returnCursor: true,
    get: {}
  };

  params.get = this.addQueryCursor(params.get, parameters);

  this.apiGet(params, callback);
};

Pinterest.prototype.myFollowingInterests = function(parameters, callback) {
  var params = {
    path: 'me/following/interests',
    objectFields: 'topic',
    useLimit: true,
    output: {
      model: 'Topic',
      isArray: true
    },
    returnCursor: true,
    get: {}
  };

  params.get = this.addQueryCursor(params.get, parameters);

  this.apiGet(params, callback);
};

Pinterest.prototype.myFollowingUsers = function(parameters, callback) {
  var params = {
    path: 'me/following/users',
    objectFields: 'user',
    useLimit: true,
    output: {
      model: 'User',
      isArray: true
    },
    returnCursor: true,
    get: {}
  };

  params.get = this.addQueryCursor(params.get, parameters);

  this.apiGet(params, callback);
};

Pinterest.prototype.getBoard = function(board, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid', null);
    return;
  }

  var params = {
    path: 'boards/'+ board,
    objectFields: 'board',
    output: {
      model: 'Board'
    }
  };

  this.apiGet(params, callback);
};

Pinterest.prototype.getPinsInBoard = function(board, parameters, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid', null);
    return;
  }

  var params = {
    path: 'boards/'+ board + '/pins',
    objectFields: 'pin',
    useLimit: true,
    output: {
      model: 'Pin',
      isArray: true
    },
    returnCursor: true,
    get: {}
  };

  params.get = this.addQueryCursor(params.get, parameters);
  
  this.apiGet(params, callback);
};

Pinterest.prototype.getPin = function(pinId, callback) {
  pinId = this.validatePinId(pinId);
  if(pinId === false) {
    callback('Pin is invalid', null);
    return;
  }

  var params = {
    path: 'pins/'+ pinId,
    objectFields: 'pin',
    output: {
      model: 'Pin'
    }
  };

  this.apiGet(params, callback);
};

Pinterest.prototype.followBoard = function(board, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid', null);
    return;
  }

  var params = {
    path: 'me/following/boards',
    get: {
      board: board
    }
  };

  this.apiPost(params, callback);
};

Pinterest.prototype.followUser = function(user, callback) {
  var params = {
    path: 'me/following/users',
    get: {
      user: user
    }
  };

  this.apiPost(params, callback);
};

Pinterest.prototype.createBoard = function(parameters, callback) {
  parameters = this.validateParametersForCreateBoard(parameters);
  if(parameters === false) {
    callback('Parameters are invalid', null);
    return;
  }

  var params = {
    path: 'boards',
    output: {
      model: 'Board'
    },
    get: {
      name: parameters.name,
      description: parameters.description
    }
  };

  this.apiPost(params, callback);
};

Pinterest.prototype.createPin = function(parameters, callback) {
  parameters = this.validateParametersForCreatePin(parameters);
  if(parameters === false) {
    callback('Parameters are invalid', null);
    return;
  }

  var params = {
    path: 'pins',
    output: {
      model: 'Pin'
    },
    get: {
      board: parameters.board,
      note: parameters.note,
      link: parameters.link
    },
    files: {}
  };
  
  if(parameters.image.length > 0) {
    params.files.image = parameters.image;
  }
  else if(parameters.image_url.length > 0) {
    params.get.image_url = parameters.image_url;
  }
  else if(parameters.image_base64.length > 0) {
    params.get.image_base64 = parameters.image_base64;
  }
  else {
    callback('No image provided', null);
  }

  this.apiPost(params, callback);
};

Pinterest.prototype.updateBoard = function(board, parameters, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid', null);
    return;
  }

  var params = {
    path: 'boards/' + board,
    output: {
      model: 'Board'
    },
    get: {}
  };

  if(parameters instanceof Object) {
    if (parameters.name !== undefined) {
      params.get.name = parameters.name;
    }

    if (parameters.description !== undefined) {
      params.get.description = parameters.description;
    }
  }
  
  this.apiPatch(params, callback);
};

Pinterest.prototype.updatePin = function(pinId, parameters, callback) {
  pinId = this.validatePinId(pinId);
  if(pinId === false) {
    callback('Pin is invalid', null);
    return;
  }

  var params = {
    path: 'pins/' + pinId,
    output: {
      model: 'Pin'
    },
    get: {}
  };

  if(parameters instanceof Object) {
    if (parameters.board !== undefined) {
      var board = this.validateBoard(parameters.board);
      if(board !== false) {
        params.get.board = board;
      }
    }

    if (parameters.note !== undefined) {
      params.get.note = parameters.note;
    }

    if (parameters.link !== undefined) {
      params.get.link = parameters.link;
    }
  }

  this.apiPatch(params, callback);
};

Pinterest.prototype.unfollowBoard = function(board, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid', null);
    return;
  }

  var params = {
    path: 'me/following/boards/' + board
  };

  this.apiDelete(params, callback);
};

Pinterest.prototype.unfollowUser = function(user, callback) {
  var params = {
    path: 'me/following/users/' + user
  };

  this.apiDelete(params, callback);
};

Pinterest.prototype.deleteBoard = function(board, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid', null);
    return;
  }

  var params = {
    path: 'boards/' + board
  };

  this.apiDelete(params, callback);
};

Pinterest.prototype.deletePin = function(pinId, callback) {
  pinId = this.validatePinId(pinId);
  if(pinId === false) {
    callback('Pin is invalid', null);
    return;
  }

  var params = {
    path: 'pins/' + pinId
  };

  this.apiDelete(params, callback);
};

Pinterest.prototype.apiGet = function(parameters, callback) {
  parameters.method = "GET";
  this.apiCall(parameters, callback);
};

Pinterest.prototype.apiPost = function(parameters, callback) {
  parameters.method = "POST";
  this.apiCall(parameters, callback);
};

Pinterest.prototype.apiPatch = function(parameters, callback) {
  parameters.method = "PATCH";
  this.apiCall(parameters, callback);
};

Pinterest.prototype.apiDelete = function(parameters, callback) {
  parameters.method = "DELETE";
  this.apiCall(parameters, callback);
};

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

Pinterest.prototype.addQueryCursor = function(get, parameters) {
  if(parameters instanceof Object && parameters.cursor !== undefined) {
    get.cursor = parameters.cursor;
  }

  return get;
};

Pinterest.prototype.getRemainingRequestsFromResult = function(resultFromRequest) {
  return parseInt(resultFromRequest.headers['x-ratelimit-remaining']);
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
  require('https').get('https://www.pinterest.com/' + url + '/', function(res) {
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

Pinterest.prototype.validatePinId = function(pinId) {
  if(typeof pinId !== "string") {
    return false;
  }

  pinId = pinId.trim();
  if(pinId.length < 1) {
    return false;
  }

  if(/^[a-zA-Z0-9_-]+$/g.test(pinId) === false) {
    return false;
  }

  return pinId;
};

Pinterest.prototype.validateQuery = function(query) {
  if(typeof query !== "string") {
    return false;
  }

  query = query.trim();
  if(query.length < 1) {
    return false;
  }

  return query;
};

Pinterest.prototype.validateBoard = function(board) {
  if(typeof board !== "string") {
    return false;
  }

  board = board.trim();
  if(board.length < 1) {
    return false;
  }

  var slashPosition = board.indexOf('/');
  if(slashPosition === -1) {
    return false;
  }

  if(slashPosition === (board.length - 1)) {
    return false;
  }

  return board;
};

Pinterest.prototype.validateParametersForCreateBoard = function(params) {
  if(!(params instanceof Object)) {
    return false;
  }

  if(params.name === undefined || typeof params.name !== "string") {
    return false;
  }

  params.name = params.name.trim();
  if(params.name.length < 1) {
    return false;
  }

  if(params.description === undefined) {
    params.description = '';
  }

  if(typeof params.name === "string") {
    params.description = params.description.trim();
  }

  return params;
};

Pinterest.prototype.validateParametersForCreatePin = function(params) {
  if(!(params instanceof Object)) {
    return false;
  }

  if(params.board === undefined || typeof params.board !== "string") {
    return false;
  }
  params.board = this.validateBoard(params.board);
  if(params.board === false) {
    return false;
  }

  if(params.note === undefined || typeof params.note !== "string") {
    return false;
  }
  params.note = params.note.trim();
  if(params.note.length < 1) {
    return false;
  }

  if(params.link === undefined) {
    params.link = '';
  }

  if(typeof params.link === "string") {
    params.link = params.link.trim();
  }

  params.image = params.image || '';
  params.image_url = params.image_url || '';
  params.image_base64 = params.image_base64 || '';

  return params;
};

module.exports = Pinterest;