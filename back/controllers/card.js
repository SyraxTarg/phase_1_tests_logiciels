const {
  findCardsByUserId,
  findCardsByName
} = require('../services/card');
const { cardsDto } = require('../dto/response/findCards');

const getCardsByUser = async (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const cards = await findCardsByUserId(userId);
  res.json(cardsDto(cards));
};

const getCardsByName = async (req, res) => {
  const card_name = req.query.card_name
  const cards = await findCardsByName(card_name);
  res.json(cardsDto(cards));
};

module.exports = {
  getCardsByUser,
  getCardsByName
};