/*
 Get pins in board

 Usage:
   node job <bot_name> get_pins_in_board <board> [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/boards/<board>/pins/

 Scope:
   read_public
*/
module.exports = function(bot, extraArguments, callback) {
  var board = extraArguments[0];
  var data = {
    cursor: extraArguments[1]
  };

  bot.getPinsInBoard(board, data, function (error, pins, pagination) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, {pins: pins, pagination: pagination});
    }
  });
};
