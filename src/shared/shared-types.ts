import { User } from "../model/user.model";
import { Message } from "../model/message.model";
import { Room } from "../model/room.model";
import { Product } from "../model/product.model";

export type IdType = string;

export interface Indentifiable {
  _id: IdType;
}

export interface StringCallback {
  (searchText: string): void;
}

export interface UserCallback {
  (user: User): void;
}

export interface MessageCallback {
  (message: Message): void;
}

export interface RoomCallback {
  (room: Room): void;
}

export interface ProductCallback {
  (product: Product): void;
}
