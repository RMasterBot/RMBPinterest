var assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Pinterest', function(){

  describe('validHttpMethods', function(){
    var Pinterest = require('../../../applications/pinterest/main.js');

    it('defaultValues is an array', function(){
      var instance = new Pinterest();
      assert.isArray(instance.validHttpMethods, 'validHttpMethods is not an object');
    });

    it('should access to validHttpMethods', function(){
      var instance = new Pinterest();
      assert.strictEqual(instance.validHttpMethods.length, 4, 'validHttpMethods has been changed');
    });
  });

  describe('defaultValues', function(){
    var Pinterest = require('../../../applications/pinterest/main.js');

    it('defaultValues is an object', function(){
      var instance = new Pinterest();
      assert.isObject(instance.defaultValues, 'defaultValues is not an object');
    });

    it('should access to defaultValues.hostname = api.pinterest.com', function(){
      var instance = new Pinterest();
      assert.strictEqual(instance.defaultValues.hostname, 'api.pinterest.com', 'Hostname not equal to api.pinterest.com');
    });

    it('should access to defaultValues.httpModule = https', function(){
      var instance = new Pinterest();
      assert.strictEqual(instance.defaultValues.httpModule, 'https', 'httpModule not equal to https');
    });

    it('should access to defaultValues.path = /', function(){
      var instance = new Pinterest();
      assert.strictEqual(instance.defaultValues.path, '/', 'Path not equal to /');
    });

    it('should access to defaultValues.pathPrefix = /v1/', function(){
      var instance = new Pinterest();
      assert.strictEqual(instance.defaultValues.pathPrefix, '/v1/', 'pathPrefix not equal to /v1/');
    });

    it('should access to defaultValues.port = 443', function(){
      var instance = new Pinterest();
      assert.strictEqual(instance.defaultValues.port, 443, 'Port not equal to 443');
    });
  });

  describe('me', function(){
    var rmasterbot = require('../../../rmasterbot.js');
    /**
     * Pinterest pinterest
     */
    var pinterestBot = rmasterbot.getBot('pinterest');
    pinterestBot.setAccessToken({access_token: process.env.ACCESS_TOKEN});
    pinterestBot.verifyAccessTokenScopesBeforeCall = false;

    it('should have a user object with username = rancoud', function(done){
      pinterestBot.me(function(err, data){
        assert.strictEqual(data.getUsername(), 'rancoud', 'Username not equal to rancoud');
        done();
      });
    });
  });
});