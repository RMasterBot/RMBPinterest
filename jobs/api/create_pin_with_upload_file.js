/*
 Create a pin with upload file

 Usage:
   node job <bot_name> create_pin_with_upload_file <board> <note> <image> [link] (-u | --user) <user_name>

 API endpoint used:
   POST /v1/pins/

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
    board: extraArguments[0],
    note: extraArguments[1],
    image: extraArguments[2],
    link: extraArguments[3]
  };

  bot.createPin(data, function (error, pin) {
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