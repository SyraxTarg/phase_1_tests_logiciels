function userDto(user) {
  return {
    id: user.id,
    username: user.username
  };
}

module.exports = { userDto };