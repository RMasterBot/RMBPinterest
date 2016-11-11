/*
 Get user suggested boards for saving a pin

 Usage:
   node job <bot_name> my_suggested_boards <pin> (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/boards/suggested/

 Scope:
   read_public
*/
module.exports = function(bot, extraArguments, callback) {
  var pinId = extraArguments[0];

  bot.mySuggestedBoards(pinId, function (error, boards) {
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