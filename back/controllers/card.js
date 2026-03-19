const { cardsDto } = require('../dto/response/findCards');
const { cardDto } = require('../dto/response/findCard');
const { updateMaskedCardDto } = require("../dto/request/updateMaskedCard")

const {
  GetCardsByUserQuery,
  GetCardsQuery,
  GetCardByIdQuery
 } = require('../queries/cardQueries');
const {
  GetCardsByUserHandler,
  GetCardsHandler,
  GetCardByIdHandler
 } = require('../queryHandlers/card')

 const {PatchMaskedCardHandler} = require("../commandHandlers/card");
 const {PatchMaskedCardCommand} = require("../commands/cardCommands");

 const getCardsByUserHandler = new GetCardsByUserHandler();
 const getCardsHandler = new GetCardsHandler();
 const getCardByIdHandler = new GetCardByIdHandler();
 const patchMaskedCardHandler = new PatchMaskedCardHandler();

const getCardsByUser = async (req, res) => {
  const userId = parseInt(req.params.user_id, 10);

  const query = new GetCardsByUserQuery({user_id: userId});
  const cards = await getCardsByUserHandler.handle(query);

  res.json(cardsDto(cards));
};

const getCards = async (req, res) => {
  const card_name = req.query.card_name || null;
  const card_type = req.query.card_type || null;
  const query = new GetCardsQuery({card_name, card_type});
  const cards = await getCardsHandler.handle(query);
  res.json(cardsDto(cards));
};


const patchMaskedCard = async (req, res) => {
  const card_id = parseInt(req.params.card_id, 10)
  const { is_masked } = updateMaskedCardDto(req.body);

  const command = new PatchMaskedCardCommand({is_masked, card_id});
  await patchMaskedCardHandler.handle(command);

  const query = new GetCardByIdQuery({card_id});
  const card = await getCardByIdHandler.handle(query);
  res.json(cardDto(card))
}

module.exports = {
  getCardsByUser,
  getCards,
  patchMaskedCard
};