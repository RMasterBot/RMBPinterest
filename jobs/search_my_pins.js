/*
 Search pin description belong to user

 Usage:
   node job <bot_name> search_my_pins <search> [cursor] (-u | --user) <user_name>

 API endpoint used:
   GET /v1/me/search/pins/

 Scope:
   read_public
*/
module.exports = function(bot, extraArguments, callback) {
  var search = extraArguments[0];
  var data = {
    cursor: extraArguments[1]
  };

  bot.searchMyPins(search, data, function (error, pins, pagination) {
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