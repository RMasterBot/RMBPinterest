/*
 Check if user is valid by checking format <user_name> and make a http request on pinterest.com

 Usage:
   node job <bot_name> valid_user <user>
*/
module.exports = function(bot, extraArguments, callback) {
  var user = extraArguments[0];

  bot.isValidUser(user, function (isValid) {
    if(callback) {
      callback(null, isValid);
    }
  });
};