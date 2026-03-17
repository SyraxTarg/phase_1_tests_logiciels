function updateMaskedCardDto(body) {
  return {
    is_masked: body.is_masked
  };
}

module.exports = { updateMaskedCardDto };