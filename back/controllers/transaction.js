const { newTransactionDto } = require("../dto/request/newTransaction");
const { transactionDto } = require('../dto/response/transaction');
const {transactionsDto} = require('../dto/response/transactions');
const {updateStatusDto} = require('../dto/request/updateTransactionStatus');
const {
  isValidStatus,
  getValidStatuses
} = require('../services/read/transactionStatusRead');

const {
  CreateTransactionCommand,
  ChangeTransactionStatusCommand
} = require("../commands/transactionCommands");
const {
  CreateTransactionHandler,
  ChangeTransactionStatusHandler
} = require("../commandHandlers/transaction");
const {
  GetTransactionsByProposerQuery,
  GetTransactionsByReceiverQuery,
  GetTransactionsByIdQuery
} = require("../queries/transactionQueries");
const {
  GetTransactionsByProposerHandler,
  GetTransactionsByReceiverHandler,
  GetTransactionsByIdHandler
} = require("../queryHandlers/transaction");
const {GetUserByIdQuery} = require("../queries/userQueries");
const {GetUserByIdHandler} = require("../queryHandlers/user");

const createTransactionHandler = new CreateTransactionHandler();
const changeTransactionStatusHandler = new ChangeTransactionStatusHandler();
const getTransactionsByProposerHandler = new GetTransactionsByProposerHandler();
const getTransactionsByReceiverHandler = new GetTransactionsByReceiverHandler();
const getTransactionsByIdHandler = new GetTransactionsByIdHandler();
const getUserByiIdHandler = new GetUserByIdHandler();

const createNewTransaction = async (req, res) => {
  const { proposerId, receiverId, proposerCardIds, receiverCardIds, messageContent } = newTransactionDto(req.body);

  if (!receiverId || !proposerCardIds?.length || !receiverCardIds?.length) {
    return res.status(400).json({ error: "Données incomplètes" });
  }

  try {
    let message = messageContent;
    const command = new CreateTransactionCommand({ proposerId,
      receiverId,
      proposerCardIds,
      receiverCardIds,
      messageContent: message
     });
    const transaction = await createTransactionHandler.handle(command);

    let cardsExchangeFormatted = [];
    for (const item of transaction.cardsExchange) {
      const user_query = new GetUserByIdQuery({user_id: item.card.userId})
      const user = await getUserByiIdHandler.handle(user_query)
      const cardWithUser = {
        ...item.card,
        user: user || { username: "Inconnu" }
      };

      cardsExchangeFormatted.push(cardWithUser);
    }

    let cardsReceiveFormatted = [];
    for (const item of transaction.cardsReceive) {
      const user_query = new GetUserByIdQuery({user_id: item.card.userId})
      const user = await getUserByiIdHandler.handle(user_query)

      const cardWithUser = {
        ...item.card,
        user: user || { username: "Inconnu" }
      };

      cardsReceiveFormatted.push(cardWithUser);
    }

    let messages = [];
    for (const item of transaction.messages) {
      const user_query = new GetUserByIdQuery({user_id: item.userId})
      const user = await getUserByiIdHandler.handle(user_query)

      const messageWithUser = {
        ...item,
        user: user
      };

      messages.push(messageWithUser);
    }

    transaction.messages = messages;
    transaction.cardsExchange = cardsExchangeFormatted;
    transaction.cardsReceive = cardsReceiveFormatted;

    res.status(201).json(transactionDto(transaction));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création de la transaction" });
  }
};

const getTransactionsByProposer = async (req, res) => {
  const proposerId = parseInt(req.params.user_id, 10);

  try {
    const query = new GetTransactionsByProposerQuery({ proposerId });
    const transactions = await getTransactionsByProposerHandler.handle(query);

    for (transaction of transactions) {
        let cardsExchangeFormatted = [];
        for (const item of transaction.cardsExchange) {
        const user_query = new GetUserByIdQuery({user_id: item.card.userId})
      const user = await getUserByiIdHandler.handle(user_query)

        const cardWithUser = {
            ...item.card,
            user: user || { username: "Inconnu" }
        };

        cardsExchangeFormatted.push(cardWithUser);
        }

        let cardsReceiveFormatted = [];
        for (const item of transaction.cardsReceive) {
          const user_query = new GetUserByIdQuery({user_id: item.card.userId})
          const user = await getUserByiIdHandler.handle(user_query)

        const cardWithUser = {
            ...item.card,
            user: user || { username: "Inconnu" }
        };

        cardsReceiveFormatted.push(cardWithUser);
        }

        let messages = [];
        for (const item of transaction.messages) {
          const user_query = new GetUserByIdQuery({user_id: item.userId})
          const user = await getUserByiIdHandler.handle(user_query)

        const messageWithUser = {
            ...item,
            user: user
        };

        messages.push(messageWithUser);
        }

        transaction.messages = messages;
        transaction.cardsExchange = cardsExchangeFormatted;
        transaction.cardsReceive = cardsReceiveFormatted;
    }
    res.status(200).json(transactionsDto(transactions));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des transactions" });
  }
};



const getTransactionsByReceiver = async (req, res) => {
  const receiverId = parseInt(req.params.user_id, 10);

  try {
    const query = new GetTransactionsByReceiverQuery({ receiverId });
    const transactions = await getTransactionsByReceiverHandler.handle(query);

    for (transaction of transactions) {
        let cardsExchangeFormatted = [];
        for (const item of transaction.cardsExchange) {
          const user_query = new GetUserByIdQuery({user_id: item.card.userId})
        const user = await getUserByiIdHandler.handle(user_query)

        const cardWithUser = {
            ...item.card,
            user: user || { username: "Inconnu" }
        };

        cardsExchangeFormatted.push(cardWithUser);
        }

        let cardsReceiveFormatted = [];
        for (const item of transaction.cardsReceive) {
          const user_query = new GetUserByIdQuery({user_id: item.card.userId})
        const user = await getUserByiIdHandler.handle(user_query)

        const cardWithUser = {
            ...item.card,
            user: user || { username: "Inconnu" }
        };

        cardsReceiveFormatted.push(cardWithUser);
        }

        let messages = [];
        for (const item of transaction.messages) {
          const user_query = new GetUserByIdQuery({user_id: item.userId})
        const user = await getUserByiIdHandler.handle(user_query)

        const messageWithUser = {
            ...item,
            user: user
        };

        messages.push(messageWithUser);
        }

        transaction.messages = messages;
        transaction.cardsExchange = cardsExchangeFormatted;
        transaction.cardsReceive = cardsReceiveFormatted;
    }
    res.status(200).json(transactionsDto(transactions));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des transactions" });
  }
};


const patchTransactionStatus = async (req, res) => {
  const transactionId = parseInt(req.params.transaction_id, 10);
  const { status } = updateStatusDto(req.body);
  if (!isValidStatus(status)) {
    return res.status(400).json({ error: `Statut de transaction invalide: ${status}. Valeurs autorisées: ${getValidStatuses().join(', ')}` });
  }
  try {
    const command = new ChangeTransactionStatusCommand({ transactionId, newStatus: status });
    const transaction = await changeTransactionStatusHandler.handle(command);

    let cardsExchangeFormatted = [];
    for (const item of transaction.cardsExchange) {
      const user_query = new GetUserByIdQuery({user_id: item.card.userId})
      const user = await getUserByiIdHandler.handle(user_query)

      const cardWithUser = {
        ...item.card,
        user: user || { username: "Inconnu" }
      };

      cardsExchangeFormatted.push(cardWithUser);
    }

    let cardsReceiveFormatted = [];
    for (const item of transaction.cardsReceive) {
      const user_query = new GetUserByIdQuery({user_id: item.card.userId})
      const user = await getUserByiIdHandler.handle(user_query)
      const cardWithUser = {
        ...item.card,
        user: user || { username: "Inconnu" }
      };

      cardsReceiveFormatted.push(cardWithUser);
    }

    let messages = [];
    for (const item of transaction.messages) {
      const user_query = new GetUserByIdQuery({user_id: item.userId})
      const user = await getUserByiIdHandler.handle(user_query)

      const messageWithUser = {
        ...item,
        user: user
      };

      messages.push(messageWithUser);
    }

    transaction.messages = messages;
    transaction.cardsExchange = cardsExchangeFormatted;
    transaction.cardsReceive = cardsReceiveFormatted;
    res.status(200).json(transactionDto(transaction));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du statut de la transaction" });
  }
};


const getTransactionById = async (req, res) => {
  const transactionId = parseInt(req.params.transaction_id, 10);

  try {
    const query = new GetTransactionsByIdQuery({ transactionId });
    const transaction = await getTransactionsByIdHandler.handle(query);

    let cardsExchangeFormatted = [];
    for (const item of transaction.cardsExchange) {
      const user_query = new GetUserByIdQuery({user_id: item.card.userId})
      const user = await getUserByiIdHandler.handle(user_query)

      const cardWithUser = {
          ...item.card,
          user: user || { username: "Inconnu" }
      };

      cardsExchangeFormatted.push(cardWithUser);
    }

    let cardsReceiveFormatted = [];
    for (const item of transaction.cardsReceive) {
      const user_query = new GetUserByIdQuery({user_id: item.card.userId})
      const user = await getUserByiIdHandler.handle(user_query)

      const cardWithUser = {
        ...item.card,
        user: user || { username: "Inconnu" }
      };

      cardsReceiveFormatted.push(cardWithUser);
    }

    let messages = [];
    for (const item of transaction.messages) {
      const user_query = new GetUserByIdQuery({user_id: item.userId})
      const user = await getUserByiIdHandler.handle(user_query)

      const messageWithUser = {
        ...item,
        user: user
      };

      messages.push(messageWithUser);
    }

    transaction.messages = messages;
    transaction.cardsExchange = cardsExchangeFormatted;
    transaction.cardsReceive = cardsReceiveFormatted;
    res.status(200).json(transactionDto(transaction));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération de la transaction" });
  }
};

module.exports = {
  createNewTransaction,
  getTransactionsByProposer,
  patchTransactionStatus,
  getTransactionsByReceiver,
  getTransactionById
}
;