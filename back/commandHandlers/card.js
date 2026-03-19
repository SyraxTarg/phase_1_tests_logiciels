const { setMaskedCard } = require('../services/write/cardWrite');

class PatchMaskedCardHandler {
  async handle(command) {
    if (!command || !command.card_id || !command.is_masked) {
      throw new Error('PatchMaskedCard requires card_id and is_masked');
    }
    return await setMaskedCard(command.is_masked, command.card_id);
  }
}

module.exports = { PatchMaskedCardHandler };