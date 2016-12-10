/*
 Unfollow user

 Usage:
   node job <bot_name> unfollow_user <user_name> (-u | --user) <user_name>

 API endpoint used:
   DELETE /v1/me/following/users/<user>/

 Scope:
   write_relationships
*/
/**
 * @param {Pinterest} bot
 * @param {string[]} extraArguments
 * @param {Job~Callback} callback
 */
module.exports = function(bot, extraArguments, callback) {
  var user = extraArguments[0];

  bot.unfollowUser(user, function (error) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, true);
    }
  });
};