/*
 Get user following users

 Usage:
   node job <bot_name> my_following_users [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/following/users/

 Scope:
   read_relationships
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

  bot.myFollowingUsers(data, function (error, users, pagination) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, {users: users, pagination: pagination});
    }
  });
};