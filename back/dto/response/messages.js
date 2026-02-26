const {messageDto} = require('./message');
function messagesDto(messages) {
  return messages.map(messageDto);
}

module.exports = { messagesDto };