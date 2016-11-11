/*
 Search board belong to user (exact board name is required)

 Usage:
   node job <bot_name> search_my_boards <search> (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/search/boards/

 Scope:
   read_public
*/
module.exports = function(bot, extraArguments, callback) {
  var search = extraArguments[0];
  var data = {
    cursor: extraArguments[1]
  };

  bot.searchMyBoards(search, data, function (error, boards, pagination) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, {boards: boards, pagination: pagination});
    }
  });
};