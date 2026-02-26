const {findCardByUserId} = require('../services/card');
const { cardsDto } = require('../dto/response/findCards');

const getCardsByUser = async (req, res) => {
  const cards = await findCardByUserId(req.user_id);
  res.json(cardsDto(cards));
};

module.exports = {getCardsByUser};