/*
 Update pin

 Usage:
   node job <bot_name> update_pin <pin> [board] [note] [link] (-u | --user) <user_name>

 API endpoint used:
   PATCH /v1/pins/<pin>/

 Scope:
   write_public
*/
module.exports = function(bot, extraArguments, callback) {
  var pinId = extraArguments[0];
  var data = {
    board: extraArguments[1],
    note: extraArguments[2],
    link: extraArguments[3]
  };

  bot.updatePin(pinId, data, function (error, pin) {
    if(error) {
      if(callback) {
        callback(error, null);
      }
      return;
    }

    if(callback) {
      callback(null, pin);
    }
  });
};