/*
 Get user following interests (topic)

 Usage:
   node job <bot_name> my_following_interests [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/following/interests/

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

  bot.myFollowingInterests(data, function (error, topics, pagination) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, {topics: topics, pagination: pagination});
    }
  });
};