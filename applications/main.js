var Bot = require('../../core/bot.js');

/**
 * Pinterest Bot
 * @class Pinterest
 * @augments Bot
 * @param {string} name
 * @param {string} folder
 * @param {Pinterest~Configuration[]} allConfigurations
 * @constructor
 */
function Pinterest(name, folder, allConfigurations){
  Bot.call(this, name, folder, allConfigurations);

  this.validHttpMethods = ['GET','POST','PATCH','DELETE'];
  this.defaultValues.port = 443;
  this.defaultValues.pathPrefix = '/v1/';
  this.defaultValues.hostname = 'api.pinterest.com';
  this.defaultValues.scopes = 'read_public,write_public,read_relationships,write_relationships';
  this.defaultValues.httpModule = 'https';

  this.defaultRemainingRequest = 200;
  this.defaultRemainingTime = 60*60;

  this.fields = {
    user: ['id', 'username', 'first_name', 'last_name', 'bio', 'created_at', 'counts', 'image', 'account_type'],
    board: ['id', 'name', 'url', 'description', 'creator', 'created_at', 'counts', 'image', 'privacy', 'reason'],
    pin: ['id', 'link', 'original_link', 'url', 'creator', 'board', 'created_at', 'note', 'color', 'counts', 'media', 'attribution', 'image', 'metadata'],
    topic: ['id', 'name']
  };
  this.limit = 100;
}

Pinterest.prototype = new Bot();
Pinterest.prototype.constructor = Pinterest;

/**
 * Return a trimmed string
 * @private
 * @param {*} variable
 */
function getStringTrimmed(variable) {
  if(typeof variable !== "string") {
    return false;
  }

  variable = variable.trim();
  if(variable.length < 1) {
    return false;
  }

  return variable;
}

/**
 * Prepare and complete parameters for request
 * @param {Bot~doRequestParameters} parameters
 * @param {Bot~requestCallback|*} callback
 */
Pinterest.prototype.prepareRequest = function(parameters, callback) {
  parameters.useAccessToken = true;

  if(parameters.get === undefined) {
    parameters.get = {};
  }

  if(parameters.path.charAt(parameters.path.length-1) !== '/') {
    parameters.path+= '/';
  }

  if(parameters.options === undefined) {
    parameters.options = {};
  }
  
  if(parameters.options.useLimit !== undefined && parameters.options.useLimit === true) {
    this.addQueryLimit(parameters);
  }

  if(parameters.options.objectFields !== undefined) {
    this.addQueryFields(parameters, parameters.options.objectFields);
  }

  this.addQueryAccessToken(parameters);

  this.doRequest(parameters, callback);
};

/**
 * API me
 * @param {Pinterest~requestUserCallback} callback
 */
Pinterest.prototype.me = function(callback) {
  var params = {
    path: 'me',
    scope: 'read_public',
    output: {
      model: 'User'
    },
    options: {
      objectFields: 'user'
    }
  };

  this.prepareRequest(params, callback);
};

/**
 * API myBoards
 * @param {Pinterest~requestArrayBoardCallback} callback
 */
Pinterest.prototype.myBoards = function(callback) {
  var params = {
    path: 'me/boards',
    scope: 'read_public',
    output: {
      model: 'Board',
      isArray: true
    },
    options: {
      objectFields: 'board'
    }
  };

  this.prepareRequest(params, callback);
};

/**
 * API mySuggestedBoards
 * @param {string} pinId
 * @param {Pinterest~requestArrayBoardCallback} callback
 */
Pinterest.prototype.mySuggestedBoards = function(pinId, callback) {
  pinId = this.validatePinId(pinId);
  if(pinId === false) {
    callback('Pin is invalid', null, null);
    return;
  }

  var params = {
    path: 'me/boards/suggested',
    scope: 'read_public',
    output: {
      model: 'Board',
      isArray: true
    },
    get: {
      pin: pinId
    },
    options: {
      objectFields: 'board'
    }
  };

  this.prepareRequest(params, callback);
};

/**
 * API myLikes
 * @param {Pinterest~Options} options
 * @param {Pinterest~requestArrayPinCallback} callback
 */
Pinterest.prototype.myLikes = function(options, callback) {
  var params = {
    path: 'me/likes',
    scope: 'read_public',
    useLimit: true,
    output: {
      model: 'Pin',
      isArray: true
    },
    returnCursor: true,
    get: {},
    options: {
      objectFields: 'pin'
    }
  };

  this.addQueryCursor(params, options);

  this.prepareRequest(params, callback);
};

/**
 * API myPins
 * @param {Pinterest~Options} options
 * @param {Pinterest~requestArrayPinCallback} callback
 */
Pinterest.prototype.myPins = function(options, callback) {
  var params = {
    path: 'me/pins',
    scope: 'read_public',
    useLimit: true,
    output: {
      model: 'Pin',
      isArray: true
    },
    returnCursor: true,
    get: {},
    options: {
      objectFields: 'pin'
    }
  };

  this.addQueryCursor(params, options);

  this.prepareRequest(params, callback);
};

/**
 * API searchMyBoards
 * @param {string} query
 * @param {Pinterest~Options} options
 * @param {Pinterest~requestArrayBoardCallback} callback
 */
Pinterest.prototype.searchMyBoards = function(query, options, callback) {
  query = this.validateQuery(query);
  if(query === false) {
    callback('Query is invalid', null, null);
    return;
  }

  var params = {
    path: 'me/search/boards',
    scope: 'read_public',
    useLimit: true,
    output: {
      model: 'Board',
      isArray: true
    },
    returnCursor: true,
    get: {
      query: query
    },
    options: {
      objectFields: 'board'
    }
  };

  this.addQueryCursor(params, options);

  this.prepareRequest(params, callback);
};

/**
 * API searchMyPins
 * @param {string} query
 * @param {Pinterest~Options} options
 * @param {Pinterest~requestArrayPinCallback} callback
 */
Pinterest.prototype.searchMyPins = function(query, options, callback) {
  query = this.validateQuery(query);
  if(query === false) {
    callback('Query is invalid', null, null);
    return;
  }

  var params = {
    path: 'me/search/pins',
    scope: 'read_public',
    useLimit: true,
    output: {
      model: 'Pin',
      isArray: true
    },
    returnCursor: true,
    get: {
      query: query
    },
    options: {
      objectFields: 'pin'
    }
  };

  this.addQueryCursor(params, options);

  this.prepareRequest(params, callback);
};

/**
 * API myFollowers
 * @param {Pinterest~Options} options
 * @param {Pinterest~requestArrayUserCallback} callback
 */
Pinterest.prototype.myFollowers = function(options, callback) {
  var params = {
    path: 'me/followers',
    scope: 'read_relationships',
    useLimit: true,
    output: {
      model: 'User',
      isArray: true
    },
    returnCursor: true,
    get: {},
    options: {
      objectFields: 'user',
    }
  };

  this.addQueryCursor(params, options);

  this.prepareRequest(params, callback);
};

/**
 * API myFollowingBoards
 * @param {Pinterest~Options} options
 * @param {Pinterest~requestArrayBoardCallback} callback
 */
Pinterest.prototype.myFollowingBoards = function(options, callback) {
  var params = {
    path: 'me/following/boards',
    scope: 'read_relationships',
    useLimit: true,
    output: {
      model: 'Board',
      isArray: true
    },
    returnCursor: true,
    get: {},
    options: {
      objectFields: 'board'
    }
  };

  this.addQueryCursor(params, options);

  this.prepareRequest(params, callback);
};

/**
 * API myFollowingInterests
 * @param {Pinterest~Options} options
 * @param {Pinterest~requestArrayTopicCallback} callback
 */
Pinterest.prototype.myFollowingInterests = function(options, callback) {
  var params = {
    path: 'me/following/interests',
    scope: 'read_relationships',
    useLimit: true,
    output: {
      model: 'Topic',
      isArray: true
    },
    returnCursor: true,
    get: {},
    options: {
      objectFields: 'topic'
    }
  };

  this.addQueryCursor(params, options);

  this.prepareRequest(params, callback);
};

/**
 * API myFollowingUsers
 * @param {Pinterest~Options} options
 * @param {Pinterest~requestArrayUserCallback} callback
 */
Pinterest.prototype.myFollowingUsers = function(options, callback) {
  var params = {
    path: 'me/following/users',
    scope: 'read_relationships',
    useLimit: true,
    output: {
      model: 'User',
      isArray: true
    },
    returnCursor: true,
    get: {},
    options: {
      objectFields: 'user'
    }
  };

  this.addQueryCursor(params, options);

  this.prepareRequest(params, callback);
};

/**
 * API getBoard
 * @param {string} board
 * @param {Pinterest~requestBoardCallback} callback
 */
Pinterest.prototype.getBoard = function(board, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid', null);
    return;
  }

  var params = {
    path: 'boards/'+ board,
    scope: 'read_public',
    output: {
      model: 'Board'
    },
    options: {
      objectFields: 'board'
    }
  };

  this.prepareRequest(params, callback);
};

/**
 * API getPinsInBoard
 * @param {string} board
 * @param {Pinterest~Options} options
 * @param {Pinterest~requestArrayPinCallback} callback
 */
Pinterest.prototype.getPinsInBoard = function(board, options, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid', null, null);
    return;
  }

  var params = {
    path: 'boards/'+ board + '/pins',
    scope: 'read_public',
    useLimit: true,
    output: {
      model: 'Pin',
      isArray: true
    },
    returnCursor: true,
    get: {},
    options: {
      objectFields: 'pin'
    }
  };

  this.addQueryCursor(params, options);

  this.prepareRequest(params, callback);
};

/**
 * API getPin
 * @param {string} pinId
 * @param {Pinterest~requestPinCallback} callback
 */
Pinterest.prototype.getPin = function(pinId, callback) {
  pinId = this.validatePinId(pinId);
  if(pinId === false) {
    callback('Pin is invalid', null);
    return;
  }

  var params = {
    path: 'pins/'+ pinId,
    scope: 'read_public',
    output: {
      model: 'Pin'
    },
    options: {
      objectFields: 'pin'
    }
  };

  this.prepareRequest(params, callback);
};

/**
 * API followBoard
 * @param {string} board
 * @param {Pinterest~requestActionCallback} callback
 */
Pinterest.prototype.followBoard = function(board, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid');
    return;
  }

  var params = {
    method: 'POST',
    path: 'me/following/boards',
    scope: 'write_relationships',
    get: {
      board: board
    }
  };

  this.prepareRequest(params, callback);
};

/**
 * API followUser
 * @param {string} user
 * @param {Pinterest~requestActionCallback} callback
 */
Pinterest.prototype.followUser = function(user, callback) {
  var params = {
    method: 'POST',
    path: 'me/following/users',
    scope: 'write_relationships',
    get: {
      user: user
    }
  };

  this.prepareRequest(params, callback);
};

/**
 * API createBoard
 * @param {Pinterest~createBoardObject} parameters
 * @param {Pinterest~requestBoardCallback} callback
 */
Pinterest.prototype.createBoard = function(parameters, callback) {
  parameters = this.validateParametersForCreateBoard(parameters);
  if(parameters === false) {
    callback('Parameters are invalid', null);
    return;
  }

  var params = {
    method: 'POST',
    path: 'boards',
    scope: 'write_public',
    output: {
      model: 'Board'
    },
    get: {
      name: parameters.name,
      description: parameters.description
    }
  };

  this.prepareRequest(params, callback);
};

/**
 * API createPin
 * @param {Pinterest~createPinObject} parameters
 * @param {Pinterest~requestPinCallback} callback
 */
Pinterest.prototype.createPin = function(parameters, callback) {
  parameters = this.validateParametersForCreatePin(parameters);
  if(parameters === false) {
    callback('Parameters are invalid', null);
    return;
  }

  var params = {
    method: 'POST',
    path: 'pins',
    scope: 'write_public',
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

  this.prepareRequest(params, callback);
};

/**
 * API updateBoard
 * @param {string} board
 * @param {Pinterest~updateBoardObject} parameters
 * @param {Pinterest~requestBoardCallback} callback
 */
Pinterest.prototype.updateBoard = function(board, parameters, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid', null);
    return;
  }

  var params = {
    method: 'PATCH',
    path: 'boards/' + board,
    scope: 'write_public',
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

  this.prepareRequest(params, callback);
};

/**
 * API updatePin
 * @param {string} pinId
 * @param {Pinterest~updatePinObject} parameters
 * @param {Pinterest~requestPinCallback} callback
 */
Pinterest.prototype.updatePin = function(pinId, parameters, callback) {
  pinId = this.validatePinId(pinId);
  if(pinId === false) {
    callback('Pin is invalid', null);
    return;
  }

  var params = {
    method: 'PATCH',
    path: 'pins/' + pinId,
    scope: 'write_public',
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

  this.prepareRequest(params, callback);
};

/**
 * API unfollowBoard
 * @param {string} board
 * @param {Pinterest~requestActionCallback} callback
 */
Pinterest.prototype.unfollowBoard = function(board, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid');
    return;
  }

  var params = {
    method: 'DELETE',
    path: 'me/following/boards/' + board,
    scope: 'write_relationships'
  };

  this.prepareRequest(params, callback);
};

/**
 * API unfollowUser
 * @param {string} user
 * @param {Pinterest~requestActionCallback} callback
 */
Pinterest.prototype.unfollowUser = function(user, callback) {
  var params = {
    method: 'DELETE',
    path: 'me/following/users/' + user,
    scope: 'write_relationships'
  };

  this.prepareRequest(params, callback);
};

/**
 * API deleteBoard
 * @param {string} board
 * @param {Pinterest~requestActionCallback} callback
 */
Pinterest.prototype.deleteBoard = function(board, callback) {
  board = this.validateBoard(board);
  if(board === false) {
    callback('Board is invalid');
    return;
  }

  var params = {
    method: 'DELETE',
    path: 'boards/' + board,
    scope: 'write_public'
  };

  this.prepareRequest(params, callback);
};

/**
 * API deletePin
 * @param {string} pinId
 * @param {Pinterest~requestActionCallback} callback
 */
Pinterest.prototype.deletePin = function(pinId, callback) {
  pinId = this.validatePinId(pinId);
  if(pinId === false) {
    callback('Pin is invalid');
    return;
  }

  var params = {
    method: 'DELETE',
    path: 'pins/' + pinId,
    scope: 'write_public'
  };

  this.prepareRequest(params, callback);
};

/**
 * Add all fields of object an Pinterest object
 * @param {Bot~doRequestParameters} parameters
 * @param {string} objectFields
 */
Pinterest.prototype.addQueryFields = function(parameters, objectFields) {
  if(this.fields[objectFields] === undefined || this.fields[objectFields].length < 1) {
    return;
  }

  var fields = this.fields[objectFields].join(',');

  if(objectFields === 'board') {
    fields = fields.replace('creator', 'creator(' + this.fields['user'].join(',') + ')');
  }

  if(objectFields === 'pin') {
    fields = fields.replace('creator', 'creator(' + this.fields['user'].join(',') + ')');
    fields = fields.replace('board', 'board(' + this.fields['board'].join(',') + ')');
  }

  if(parameters.get === undefined) {
    parameters.get = {};
  }

  parameters.get.fields = fields;
};

/**
 * Add limit to query parameters
 * @param {Bot~doRequestParameters} parameters
 */
Pinterest.prototype.addQueryLimit = function(parameters) {
  if(parameters.get === undefined) {
    parameters.get = {};
  }

  parameters.get.limit = this.limit;
};

/**
 * Add access token to query parameters
 * @param {Bot~doRequestParameters} parameters
 */
Pinterest.prototype.addQueryAccessToken = function(parameters) {
  if(parameters.get === undefined) {
    parameters.get = {};
  }

  parameters.get.access_token = this.accessToken.access_token;
};

/**
 * Add cursor to query
 * @param {Bot~doRequestParameters} parameters
 * @param {Object} options
 */
Pinterest.prototype.addQueryCursor = function(parameters, options) {
  if(options instanceof Object && options.cursor !== undefined) {
    parameters.get.cursor = options.cursor;
  }
};

/**
 * Get remaining requests from result 
 * @param {Request~Response} resultFromRequest
 * @return {Number}
 */
Pinterest.prototype.getRemainingRequestsFromResult = function(resultFromRequest) {
  return resultFromRequest.headers['x-ratelimit-remaining'] >> 0;
};

/**
 * Get url for Access Token when you have to authorize an application
 * @param {string} scopes
 * @return {string} url
 */
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

/**
 * Extract response in data for Access Token
 * @param {Object} req request from local node server
 * @return {*} code or something from response
 */
Pinterest.prototype.extractResponseDataForAccessToken = function(req) {
  var query = require('url').parse(req.url, true).query;

  if(query.code === undefined) {
    return null;
  }

  return query.code;
};

/**
 * Request Access Token after getting code
 * @param {string} responseData
 * @param {Bot~requestAccessTokenCallback} callback
 */
Pinterest.prototype.requestAccessToken = function(responseData, callback) {
  var uri = 'grant_type=authorization_code&'
    + 'client_id=' + this.currentConfiguration.consumer_key + '&'
    + 'client_secret=' + this.currentConfiguration.consumer_secret + '&'
    + 'code=' + responseData;

  var params = {
    method: 'POST',
    path: 'oauth/token?' + uri
  };

  this.request(params, function(error, result){
    if(error) {
      callback(error, null);
      return;
    }

    if(result.statusCode === 200) {
      callback(null, JSON.parse(result.data));
    }
    else {
      callback(JSON.parse(result.data), null);
    }
  });
};

/**
 * getAccessTokenFromAccessTokenData
 * @param {*} accessTokenData
 * @return {*}
 */
Pinterest.prototype.getAccessTokenFromAccessTokenData = function(accessTokenData) {
  return accessTokenData.access_token;
};

/**
 * getTypeAccessTokenFromAccessTokenData
 * @param {*} accessTokenData
 * @return {*}
 */
Pinterest.prototype.getTypeAccessTokenFromAccessTokenData = function(accessTokenData) {
  //noinspection JSUnresolvedVariable
  return accessTokenData.token_type;
};

/**
 * getUserForNewAccessToken
 * @param {*} formatAccessToken
 * @param {Bot~getUserForNewAccessTokenCallback} callback
 */
Pinterest.prototype.getUserForNewAccessToken = function(formatAccessToken, callback) {
  var that = this;

  that.setCurrentAccessToken(formatAccessToken.access_token);
  that.verifyAccessTokenScopesBeforeCall = false;
  this.me(function(err, user){
    that.verifyAccessTokenScopesBeforeCall = true;
    if(err) {
      callback(err, null);
    }
    else {
      var username = (user !== null) ? user.getUsername() : null;
      callback(null, username);
    }
  });
};

/**
 * Validate Pin Id
 * @param {string} pinId
 * @return {string|boolean} pinId
 */
Pinterest.prototype.validatePinId = function(pinId) {
  pinId = getStringTrimmed(pinId);
  if(pinId === false) {
    return false;
  }

  if(/^[a-zA-Z0-9_-]+$/g.test(pinId) === false) {
    return false;
  }

  return pinId;
};

/**
 * Validate query
 * @param {string} query
 * @return {string|boolean} query
 */
Pinterest.prototype.validateQuery = function(query) {
  return getStringTrimmed(query);
};

/**
 * Validate board
 * @param {string} board
 * @return {string|boolean} query
 */
Pinterest.prototype.validateBoard = function(board) {
  var slashPosition;

  board = getStringTrimmed(board);
  if(board === false) {
    return false;
  }

  slashPosition = board.indexOf('/');
  if(slashPosition === -1 || slashPosition === (board.length - 1)) {
    return false;
  }

  return board;
};

/**
 * Validate parameters for creating a board 
 * @param params
 * @return {*}
 */
Pinterest.prototype.validateParametersForCreateBoard = function(params) {
  if(!(params instanceof Object)) {
    return false;
  }

  params.name = getStringTrimmed(params.name);
  if(params.name === false){
    return false;
  }

  if(params.description === undefined) {
    params.description = '';
  }

  params.description = getStringTrimmed(params.description);

  return params;
};

/**
 * Validate parameters for creating a pin
 * @param params
 * @return {*}
 */
Pinterest.prototype.validateParametersForCreatePin = function(params) {
  if(!(params instanceof Object)) {
    return false;
  }

  params.board = this.validateBoard(params.board);
  if(params.board === false) {
    return false;
  }

  params.note = getStringTrimmed(params.note);
  if(params.note === false) {
    return false;
  }

  if(params.link === undefined) {
    params.link = '';
  }

  params.link = getStringTrimmed(params.link);

  params.image = params.image || '';
  params.image_url = params.image_url || '';
  params.image_base64 = params.image_base64 || '';

  return params;
};

module.exports = Pinterest;

/**
 * Pinterest Configuration
 * @typedef {Object} Pinterest~Configuration
 * @property {string} name
 * @property {string} consumer_key
 * @property {string} consumer_secret
 * @property {string} access_token
 * @property {string} callback_url
 * @property {string} scopes
 */
/**
 * Options Object
 * @typedef {Object} Pinterest~Options
 * @property {string} cursor
 */
/**
 * ResultPagination Object
 * @typedef {Object} Pinterest~ResultPagination
 * @property {?string} cursor
 * @property {?string} next
 */
/**
 * create Board Object
 * @typedef {Object} Pinterest~createBoardObject
 * @property {string} name
 * @property {string} description
 */
/**
 * update Board Object
 * @typedef {Pinterest~createBoardObject} Pinterest~updateBoardObject
 */
/**
 * create Pin Object
 * @typedef {Object} Pinterest~createPinObject
 * @property {string} board
 * @property {string} note
 * @property {string} link
 * @property {string} [image]
 * @property {string} [image_url]
 * @property {string} [image_base64]
 */
/**
 * update Pin Object
 * @typedef {Object} Pinterest~updatePinObject
 * @property {string} board
 * @property {string} note
 * @property {string} link
 */
/**
 * Request callback contain user
 * @callback Pinterest~requestUserCallback
 * @param {Error|string|null} error - Error
 * @param {User} user - User
 */
/**
 * Request callback contain board
 * @callback Pinterest~requestBoardCallback
 * @param {Error|string|null} error - Error
 * @param {Board} board - Board
 */
/**
 * Request callback contain pin
 * @callback Pinterest~requestPinCallback
 * @param {Error|string|null} error - Error
 * @param {Pin} pin - Pin
 */
/**
 * Request callback contains array of users
 * @callback Pinterest~requestArrayUserCallback
 * @param {Error|string|null} error - Error
 * @param {User[]} users - Array of Users
 * @param {?Pinterest~ResultPagination} pagination - Pagination
 */
/**
 * Request callback contains array of boards
 * @callback Pinterest~requestArrayBoardCallback
 * @param {Error|string|null} error - Error
 * @param {Board[]} boards - Array of Boards
 * @param {?Pinterest~ResultPagination} pagination - Pagination
 */
/**
 * Request callback contains array of pins
 * @callback Pinterest~requestArrayPinCallback
 * @param {Error|string|null} error - Error
 * @param {Pin[]} pins - Array of Pins
 * @param {?Pinterest~ResultPagination} pagination - Pagination
 */
/**
 * Request callback contains array of topics
 * @callback Pinterest~requestArrayTopicCallback
 * @param {Error|string|null} error - Error
 * @param {Topic[]} topics - Array of Topics
 * @param {?Pinterest~ResultPagination} pagination - Pagination
 */
/**
 * Request callback after action
 * @callback Pinterest~requestActionCallback
 * @param {Error|string|null} error - Error
 */