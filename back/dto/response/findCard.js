const {userDto} = require('./findUser');

function cardDto(card) {
  return {
    id: card.id,
    name: card.name,
    description: card.description,
    type: card.type,
    pv: card.pv,
    image: card.image,
    user: userDto(card.user)
  };
}

module.exports = { cardDto };