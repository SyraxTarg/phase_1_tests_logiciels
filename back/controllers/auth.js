const { loginDto } = require('../dto/request/login');

const { LoginQuery } = require('../queries/authQueries');
const { LoginHandler } = require('../queryHandlers/auth')

const loginHandler = new LoginHandler();
const login = async (req, res) => {
  const { username, password } = loginDto(req.body);
  if (!username || !password) return res.status(400).json({ error: 'Username et password required' });

  const query = new LoginQuery({username, password});
  const result = await loginHandler.handle(query)

  if (!result.success) return res.status(401).json({ error: result.error });

  res.json({token: result.token });
};

module.exports = {login};