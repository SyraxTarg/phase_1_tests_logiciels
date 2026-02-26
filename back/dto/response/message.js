const { time } = require('console');
const {userDto} = require('./findUser');
function messageDto(message) {
  return {
    id: message.id,
    content: message.content,
    user: userDto(message.user),
    timestamp: message.timestamp
  };
}

module.exports = { messageDto };