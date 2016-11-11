/*
 Get pin

 Usage:
   node job <bot_name> get_pin <pin> (-u | --user) <user_name>

 API endpoint used:
   GET /v1/pins/<pin>/

 Scope:
   read_public
*/
module.exports = function(bot, extraArguments, callback) {
  var pinId = extraArguments[0];

  bot.getPin(pinId, function (error, pin) {
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