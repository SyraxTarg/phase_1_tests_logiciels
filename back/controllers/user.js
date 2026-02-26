const {findAllUsers, findUserById} = require('../services/user');
const { usersDto } = require('../dto/response/findAllUsers');
const { userDto } = require('../dto/response/findUser');

const getAllUsers = async (req, res) => {
  const users = await findAllUsers();
  res.json(usersDto(users));
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  res.json(userDto(user));
};

const getCurrentUser = async (req, res) => {
  const user = await findUserById(1);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
  res.json(userDto(user));
};

module.exports = {getAllUsers, getUserById, getCurrentUser};