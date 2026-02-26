export type User = {
  id: number;
  username: string;
};

export type Card = {
  id: number;
  name: string;
  description: string;
  type: string;
  pv: number;
  image: string;
  userId: string;
  user: User;
};
