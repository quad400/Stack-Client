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
  _id?: string;
  name: string;
  imageUri: string;
  boards: IBoard[];
  members: IMember[];
  createdBy: IUser;
}

export interface IBoard {
  _id: string;
  name: string;
  imageUri: string;
  workspace: IWorkspace;
  lists: IList[];
}

export interface IBoard {
  _id: string;
  name: string;
  imageUri: string;
}

export interface IList {
  _id: string;
  name: string;
  board: IBoard;
  //   order: number;
  cards: ICard[];
}

export interface ICard {
  _id: string;
  name: string;
  //   order: number;
  list: IList;
  description: string;
}
