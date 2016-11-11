/*
 Unfollow board

 Usage:
   node job <bot_name> unfollow_board <board> (-u | --user) <user_name>

 API endpoint used:
   DELETE /v1/me/following/boards/<board>/

 Scope:
   write_relationships
*/
module.exports = function(bot, extraArguments, callback) {
  var board = extraArguments[0];

  bot.unfollowBoard(board, function (error) {
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