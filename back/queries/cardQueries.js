class GetCardsByUserQuery {
  constructor({ user_id }) {
    this.user_id = user_id;
  }
}

class GetCardByIdQuery {
  constructor({ card_id }) {
    this.card_id = card_id;
  }
}

class GetCardsQuery {
  constructor({ card_name, card_type }) {
    this.card_name = card_name;
    this.card_type = card_type;
  }
}

module.exports = { 
    GetCardsByUserQuery,
    GetCardsQuery,
    GetCardByIdQuery
 };