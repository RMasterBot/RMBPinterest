/*
 Delete board

 Usage:
   node job <bot_name> delete_board <board> (-u | --user) <user_name>

 API endpoint used:
   DELETE /v1/boards/<board>/

 Scope:
   write_public
*/
/**
 * @param {Pinterest} bot
 * @param {string[]} extraArguments
 * @param {Job~Callback} callback
 */
module.exports = function(bot, extraArguments, callback) {
  var board = extraArguments[0];

  bot.deleteBoard(board, function (error) {
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
