const {userDto} = require('./findUser');
function messageDto(message) {
  return {
    id: message.id,
    content: message.content,
    user: userDto(message.user)
  };
}

module.exports = { messageDto };