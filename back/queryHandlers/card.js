const {
    findCards,
    findCardsByUserId,
    findCardById
 } = require('../services/read/cardRead');

class GetCardsByUserHandler {
  async handle(query) {
    if (!query || !query.user_id) {
      throw new Error('GetcardsByUser requires user_id');
    }
    return await findCardsByUserId(query.user_id);
  }
}

class GetCardByIdHandler {
  async handle(query) {
    if (!query || !query.card_id) {
      throw new Error('GetCardById requires card_id');
    }
    return await findCardById(query.card_id);
  }
}

class GetCardsHandler {
  async handle(query) {
    if (!query) {
      throw new Error('Getcards optionnally requires card_name and card_type');
    }
    return await findCards(query.card_name, query.card_type);
  }
}

module.exports = {
    GetCardsByUserHandler,
    GetCardsHandler,
    GetCardByIdHandler
 };