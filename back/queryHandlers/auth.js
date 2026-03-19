const { loginUser } = require('../services/read/authRead');

class LoginHandler {
  async handle(command) {
    if (!command || !command.username || !command.password) {
      throw new Error('Login requires username and password');
    }
    return await loginUser(command.username, command.password);
  }
}

module.exports = { LoginHandler };