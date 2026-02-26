const {findCardByUserId} = require('../services/card');
const { cardsDto } = require('../dto/response/findCards');

const getCardsByUser = async (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const cards = await findCardByUserId(userId);
  res.json(cardsDto(cards));
};

module.exports = {getCardsByUser};