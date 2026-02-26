const {userDto} = require('./findUser');
function usersDto(users) {
  return users.map(userDto);
}

module.exports = { usersDto };