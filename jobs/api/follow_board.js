/*
 Follow board

 Usage:
   node job <bot_name> follow_board <board> (-u | --user) <user_name>

 API endpoint used:
   POST /v1/me/following/boards/

 Scope:
   write_relationships
*/
/**
 * @param {Pinterest} bot
 * @param {string[]} extraArguments
 * @param {Job~Callback} callback
 */
module.exports = function(bot, extraArguments, callback) {
  var board = extraArguments[0];

  bot.followBoard(board, function (error) {
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