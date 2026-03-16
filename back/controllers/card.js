const {
  findCardsByUserId,
  findCards
} = require('../services/card');
const { cardsDto } = require('../dto/response/findCards');

const getCardsByUser = async (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const cards = await findCardsByUserId(userId);
  res.json(cardsDto(cards));
};

const getCards = async (req, res) => {
  const card_name = req.query.card_name
  const card_type = req.query.card_type
  const cards = await findCards(name=card_name, type=card_type);
  res.json(cardsDto(cards));
};

module.exports = {
  getCardsByUser,
  getCards
};