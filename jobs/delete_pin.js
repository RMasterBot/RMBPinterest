/*
 Delete pin

 Usage:
   node job <bot_name> delete_pin <pin> (-u | --user) <user_name>

 API endpoint used:
   DELETE /v1/pins/<pin>/

 Scope:
   write_public
*/
module.exports = function(bot, extraArguments, callback) {
  var pinId = extraArguments[0];

  bot.deletePin(pinId, function (error) {
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
