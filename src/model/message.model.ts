import { User } from "./user.model";

export interface IMessage {
  user: User | undefined;
  message: String;
  roomName: String;
}

export class Message implements IMessage {
  constructor(
    public user: User | undefined,
    public message: String,
    public roomName: String
  ) {}
}
