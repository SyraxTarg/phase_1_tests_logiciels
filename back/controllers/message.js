const {findMessagesByTransaction} = require('../services/message');
const { messageDto } = require('../dto/response/message');
const { messagesDto } = require('../dto/response/messages');

const getMessagesByTransaction = async (req, res) => {
    const transactionId = parseInt(req.params.transaction_id);
    const messages = await findMessagesByTransaction(transactionId);
    if (!messages) {
        return res.status(200).json([]);
    }
    res.status(200).json(messagesDto(messages));
};

module.exports = {getMessagesByTransaction};