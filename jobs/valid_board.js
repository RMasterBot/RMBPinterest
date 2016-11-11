/*
 Check if board is valid by checking format <user_name/board_name> and make a http request on pinterest.com

 Usage:
   node job <bot_name> valid_board <board>
*/
module.exports = function(bot, extraArguments, callback) {
  var board = extraArguments[0];

  bot.isValidBoard(board, function (isValid) {
    if(callback) {
      callback(null, isValid);
    }
  });
};