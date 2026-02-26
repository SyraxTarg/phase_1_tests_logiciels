const {findAllUsers} = require('../services/user');
const { usersDto } = require('../dto/response/findAllUsers');

const getAllUsers = async (req, res) => {
  const users = await findAllUsers();
  res.json(usersDto(users));
};

module.exports = {getAllUsers};