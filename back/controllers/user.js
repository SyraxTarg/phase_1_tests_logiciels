const { usersDto } = require("../dto/response/findAllUsers");
const { userDto } = require("../dto/response/findUser");

const {GetUserByIdQuery} = require("../queries/userQueries");
const {
  GetAllUsersHandler,
  GetUserByIdHandler
} = require("../queryHandlers/user");

const getAllUsersHandler = new GetAllUsersHandler();
const getUserByIdHandler = new GetUserByIdHandler();

const getAllUsers = async (req, res) => {
  const users = await getAllUsersHandler.handle();
  res.json(usersDto(users));
};

const getUserById = async (req, res) => {
  const user_id = parseInt(req.params.user_id, 10);

  const query = new GetUserByIdQuery({user_id});
  const user = await getUserByIdHandler.handle(query);

  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }
  res.json(userDto(user));
};

const getCurrentUser = async (req, res) => {
  const query = new GetUserByIdQuery({user_id: req.user.id});
  const user = await getUserByIdHandler.handle(query);

  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }
  res.json(userDto(user));
};

module.exports = { getAllUsers, getUserById, getCurrentUser };
