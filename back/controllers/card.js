const {
  findCardsByUserId,
  findCards,
  setMaskedCard,
  findCardById
} = require('../services/card');
const { cardsDto } = require('../dto/response/findCards');
const { cardDto } = require('../dto/response/findCard');
const { updateMaskedCardDto } = require("../dto/request/updateMaskedCard")

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


const patchMaskedCard = async (req, res) => {
  const card_id = parseInt(req.params.card_id, 10)
  const { is_masked } = updateMaskedCardDto(req.body);
  await setMaskedCard(is_masked, card_id)
  const card = await findCardById(card_id)
  res.json(cardDto(card))
}

module.exports = {
  getCardsByUser,
  getCards,
  patchMaskedCard
};