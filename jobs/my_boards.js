/*
 Get User boards

 Usage:
   node job <bot_name> my_boards (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/boards/

 Scope:
   read_public
*/
module.exports = function(bot, extraArguments, callback) {
  bot.myBoards(function (error, boards) {
    if (error) {
      if (callback) {
        callback(error, null);
      }
      return;
    }

    if (callback) {
      callback(null, boards);
    }
  });
};
