/*
 Get board

 Usage:
   node job <bot_name> get_board <board> (-u | --user) <user_name>

 API endpoint used:
   GET /v1/boards/<board>/

 Scope:
   read_public
*/
module.exports = function(bot, extraArguments, callback) {
  var board = extraArguments[0];

  bot.getBoard(board, function (error, board) {
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