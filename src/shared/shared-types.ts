import { User } from "../model/user.model";

export type IdType = string;

export interface Indentifiable {
    id: IdType
}

export interface StringCallback {
    (searchText: string): void;
}

export interface UserCallback {
    (user: User): void;
}
