function messageDto(message) {
  return {
    id: message.id,
    content: message.content,
  };
}

module.exports = { messageDto };