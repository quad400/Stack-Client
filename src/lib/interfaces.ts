export interface IUser {
  fullName: string;
  email: string;
  avatar: string;
}

export interface IMember {
  _id: string;
  user: IUser;
  role: string;
}
export interface IWorkspace {
  _id: string;
  createdBy: IUser;
  name: string;
  image: string;
  description: string;
  boards: IBoard[];
  inviteCode: string;
  members: IMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IBoard {
  _id: string;
  name: string;
  image: string;
  workspaceId: IWorkspace;
  lists: IList[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IList {
  _id: string;
  name: string;
  boardId: IBoard;
  order: number;
  cards: ICard[];
}

export interface ICard {
  _id: string;
  name: string;
  order: number;
  listId: IList;
  description?: string;
}