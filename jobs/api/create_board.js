/*
 Create a board

 Usage:
   node job <bot_name> create_board <board_name> [description] (-u | --user) <user_name>

 API endpoint used:
   POST /v1/boards/

 Scope:
   write_public
*/
/**
 * @param {Pinterest} bot
 * @param {string[]} extraArguments
 * @param {Job~Callback} callback
 */
module.exports = function(bot, extraArguments, callback) {
  var data = {
    name: extraArguments[0],
    description: extraArguments[1]
  };

  bot.createBoard(data, function (error, board) {
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