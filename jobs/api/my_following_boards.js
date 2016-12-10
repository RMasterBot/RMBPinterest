/*
 Get user following boards

 Usage:
   node job <bot_name> my_following_boards [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/following/boards/

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

  bot.myFollowingBoards(data, function (error, boards, pagination) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, {boards: boards, pagination: pagination});
    }
  });
};