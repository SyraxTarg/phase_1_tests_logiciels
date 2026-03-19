const { messageDto } = require('../dto/response/message');
const { messagesDto } = require('../dto/response/messages');
const {newMessageDto} = require('../dto/request/newMessage');
const { CreateMessageCommand } = require('../commands/messageCommands');
const { CreateMessageHandler } = require('../commandHandlers/message');
const { GetMessagesByTransactionQuery } = require('../queries/messageQueries');
const { GetMessagesByTransactionHandler } = require('../queryHandlers/messages')

const createMessageHandler = new CreateMessageHandler();
const getMessagesByTransactionHandler = new GetMessagesByTransactionHandler();

const getMessagesByTransaction = async (req, res) => {
    const transactionId = parseInt(req.params.transaction_id);

    const query = new GetMessagesByTransactionQuery({ transactionId: transactionId });
    const messages = await getMessagesByTransactionHandler.handle(query);
    if (!messages) {
        return res.status(200).json([]);
    }
    res.status(200).json(messagesDto(messages));
};

const postMessage = async (req, res) => {
    const transactionId = parseInt(req.params.transaction_id);
    const userId = req.user.id;
    const { content } = newMessageDto(req.body);

    const command = new CreateMessageCommand({ transactionId, userId, content });
    const message = await createMessageHandler.handle(command);

    res.status(201).json(messageDto(message));
};

module.exports = {getMessagesByTransaction, postMessage};