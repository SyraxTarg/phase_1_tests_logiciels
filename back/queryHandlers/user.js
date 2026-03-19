const { findAllUsers, findUserById } = require("../services/read/userRead");

class GetAllUsersHandler {
  async handle() {
    return await findAllUsers();
  }
}

class GetUserByIdHandler {
  async handle(query) {
    if (!query || !query.user_id) {
      throw new Error('GetUserById requires user_id');
    }
    return await findUserById(query.user_id);
  }
}


module.exports = { 
    GetAllUsersHandler,
    GetUserByIdHandler
 };