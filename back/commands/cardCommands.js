class PatchMaskedCardCommand {
  constructor({ is_masked, card_id }) {
    this.card_id = card_id;
    this.is_masked = is_masked;
  }
}

module.exports = { PatchMaskedCardCommand };