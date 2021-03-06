import { Indentifiable, IdType } from "../shared/shared-types";
import { User } from "./user.model";

export interface IRoom extends Indentifiable {
  roomName: string;
  participants: User[];
}

export class Room implements IRoom {
  constructor(
    public _id: IdType,
    public roomName: string,
    public participants: User[]
  ) {}
}
