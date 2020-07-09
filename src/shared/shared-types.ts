import { User } from "../model/user.model";
import { Message } from "../model/message.model";

export type IdType = string;

export interface Indentifiable {
    _id: IdType
}

export interface StringCallback {
    (searchText: string): void;
}

export interface UserCallback {
    (user: User): void;
}

export interface MessageCallback{
    (message: Message): void;
}
