const { newTransactionDto } = require("../dto/request/newTransaction");
const {
  createTransaction,
  findTransactionByProposerId,
  changeTransactionStatus,
  findTransactionByReceiverId
} = require("../services/transaction");
const { transactionDto } = require('../dto/response/transaction');
const {transactionsDto} = require('../dto/response/transactions');
const { findUserById } = require('../services/user');
const {updateStatusDto} = require('../dto/request/updateTransactionStatus');
const {
  isValidStatus,
  getValidStatuses
} = require('../services/transactionStatus');

const createNewTransaction = async (req, res) => {
  const { proposerId, receiverId, proposerCardIds, receiverCardIds, messageContent } = newTransactionDto(req.body);

  if (!receiverId || !proposerCardIds?.length || !receiverCardIds?.length) {
    return res.status(400).json({ error: "Données incomplètes" });
  }

  try {
    const transaction = await createTransaction(
      proposerId,
      receiverId,
      proposerCardIds,
      receiverCardIds,
      messageContent || null
    );

    let cardsExchangeFormatted = [];
    for (const item of transaction.cardsExchange) {
      const user = await findUserById(item.card.userId);

      const cardWithUser = {
        ...item.card,
        user: user || { username: "Inconnu" }
      };

      cardsExchangeFormatted.push(cardWithUser);
    }

    let cardsReceiveFormatted = [];
    for (const item of transaction.cardsReceive) {
      const user = await findUserById(item.card.userId);

      const cardWithUser = {
        ...item.card,
        user: user || { username: "Inconnu" }
      };

      cardsReceiveFormatted.push(cardWithUser);
    }

    let messages = [];
    for (const item of transaction.messages) {
      const user = await findUserById(item.userId);

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
    const transactions = await findTransactionByProposerId(proposerId);

    for (transaction of transactions) {
        let cardsExchangeFormatted = [];
        for (const item of transaction.cardsExchange) {
        const user = await findUserById(item.card.userId);

        const cardWithUser = {
            ...item.card,
            user: user || { username: "Inconnu" }
        };

        cardsExchangeFormatted.push(cardWithUser);
        }

        let cardsReceiveFormatted = [];
        for (const item of transaction.cardsReceive) {
        const user = await findUserById(item.card.userId);

        const cardWithUser = {
            ...item.card,
            user: user || { username: "Inconnu" }
        };

        cardsReceiveFormatted.push(cardWithUser);
        }

        let messages = [];
        for (const item of transaction.messages) {
        const user = await findUserById(item.userId);

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
    const transactions = await findTransactionByReceiverId(receiverId);

    for (transaction of transactions) {
        let cardsExchangeFormatted = [];
        for (const item of transaction.cardsExchange) {
        const user = await findUserById(item.card.userId);

        const cardWithUser = {
            ...item.card,
            user: user || { username: "Inconnu" }
        };

        cardsExchangeFormatted.push(cardWithUser);
        }

        let cardsReceiveFormatted = [];
        for (const item of transaction.cardsReceive) {
        const user = await findUserById(item.card.userId);

        const cardWithUser = {
            ...item.card,
            user: user || { username: "Inconnu" }
        };

        cardsReceiveFormatted.push(cardWithUser);
        }

        let messages = [];
        for (const item of transaction.messages) {
        const user = await findUserById(item.userId);

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
    const transaction = await changeTransactionStatus(transactionId, status);

    let cardsExchangeFormatted = [];
    for (const item of transaction.cardsExchange) {
      const user = await findUserById(item.card.userId);

      const cardWithUser = {
        ...item.card,
        user: user || { username: "Inconnu" }
      };

      cardsExchangeFormatted.push(cardWithUser);
    }

    let cardsReceiveFormatted = [];
    for (const item of transaction.cardsReceive) {
      const user = await findUserById(item.card.userId);
      const cardWithUser = {
        ...item.card,
        user: user || { username: "Inconnu" }
      };

      cardsReceiveFormatted.push(cardWithUser);
    }

    let messages = [];
    for (const item of transaction.messages) {
      const user = await findUserById(item.userId);

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

module.exports = {
  createNewTransaction,
  getTransactionsByProposer,
  patchTransactionStatus,
  getTransactionsByReceiver
}
;