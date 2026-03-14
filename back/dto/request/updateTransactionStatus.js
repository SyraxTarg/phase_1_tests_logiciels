function updateStatusDto(body) {
  return {
    status: body.status
  };
}

module.exports = { updateStatusDto };