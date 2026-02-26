function newMessageDto(newMessage) {
  return {
    content: newMessage.content,
  };
}

module.exports = { newMessageDto };