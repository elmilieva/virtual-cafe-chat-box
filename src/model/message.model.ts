import { User } from "./user.model";

export interface IMessage {
  user: User | undefined;
  message: String;
}

export class Message implements IMessage {
  constructor(public user: User | undefined, public message: String) {}
}
