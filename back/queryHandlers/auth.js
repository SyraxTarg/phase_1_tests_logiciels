const { loginUser } = require('../services/read/authRead');

class LoginHandler {
  async handle(query) {
    if (!query || !query.username || !query.password) {
      throw new Error('Login requires username and password');
    }
    return await loginUser(query.username, query.password);
  }
}

module.exports = { LoginHandler };