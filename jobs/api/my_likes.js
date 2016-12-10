/*
 Get user likes

 Usage:
   node job <bot_name> my_likes [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/likes/

 Scope:
   read_public
*/
/**
 * @param {Pinterest} bot
 * @param {string[]} extraArguments
 * @param {Job~Callback} callback
 */
module.exports = function(bot, extraArguments, callback) {
  var data = {
    cursor: extraArguments[0]
  };

  bot.myLikes(data, function (error, pins, pagination) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, {pins: pins, pagination: pagination});
    }
  });
};