const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: 'file:./pokecenter.db' })
});



async function changeCardUser(card_id, user_id) {
  return prisma.card.update({
    where: {id: card_id},
    data: {
      user: {
        connect: { id: user_id }
      }}
  })
}

async function setMaskedCard(is_masked, card_id) {
  return prisma.card.update({
    where: {id: card_id},
    data: {
      masked: is_masked
    }
  })
}



module.exports = {
  changeCardUser,
  setMaskedCard,
};