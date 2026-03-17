export type User = {
  id: number;
  username: string;
};

export type Card = {
  id: number;
  name: string;
  description: string;
  masked: boolean;
  type: string;
  pv: number;
  image: string;
  userId: string;
  user: User;
};

export type CardBasic = {
  id: number;
  name: string;
  type: string;
  pv: number;
  image: string;
};

export type TransactionContent = {
  proposerId: number;
  receiverId: number;
  proposerCardIds: number[];
  receiverCardIds: number[];
  messageContent: string | null;
};

export type Transaction = {
  id: number;
  status: string; // ex: "pending", "accepted", "rejected"
  proposer: User;
  receiver: User;
  cardsExchange: CardBasic[];
  cardsReceive: CardBasic[];
  messages: Message[];
}


export type Message = {
  id: number;
  content: string;
  user: User;
  timestamp: string;
};
