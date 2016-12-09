/*
 Update board

 Usage:
   node job <bot_name> update_board <board> [name] [description] (-u | --user) <user_name>

 API endpoint used:
   PATCH /v1/boards/<board>/

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
  var data = {
    name: extraArguments[1],
    description: extraArguments[2]
  };

  bot.updateBoard(board, data, function (error, board) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, board);
    }
  });
};