const {cardDto} = require('./findCard');
function cardsDto(cards) {
  return cards.map(cardDto);
}

module.exports = { cardsDto };