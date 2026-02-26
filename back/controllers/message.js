const {findMessagesByTransaction, createMessage} = require('../services/message');
const { messageDto } = require('../dto/response/message');
const { messagesDto } = require('../dto/response/messages');
const {newMessageDto} = require('../dto/request/newMessage');

const getMessagesByTransaction = async (req, res) => {
    const transactionId = parseInt(req.params.transaction_id);
    const messages = await findMessagesByTransaction(transactionId);
    if (!messages) {
        return res.status(200).json([]);
    }
    res.status(200).json(messagesDto(messages));
};

const postMessage = async (req, res) => {
    const transactionId = parseInt(req.params.transaction_id);
    const userId = req.user.id;
    const { content } = newMessageDto(req.body);
    const message = await createMessage(transactionId, userId, content);
    res.status(201).json(messageDto(message));
};

module.exports = {getMessagesByTransaction, postMessage};