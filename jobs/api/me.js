/*
 Get User profile

 Usage:
   node job <bot_name> me (-a | --app) <app_name> (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/

 Scope:
   read_public
*/
/**
 * @param {Pinterest} bot
 * @param {string[]} extraArguments
 * @param {Job~Callback} callback
 */
module.exports = function(bot, extraArguments, callback) {
  bot.me(function (error, user) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, user);
    }
  });
};