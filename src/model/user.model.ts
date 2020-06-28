import { Indentifiable, IdType } from '../shared/shared-types';
export interface IUser extends Indentifiable {
    id: IdType;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    imageUrl?: string;
    username: string;
    
}

export class User implements IUser {
    constructor(
        public id: IdType,
        public firstName: string,
        public lastName: string,
        public password: IdType,
        public email: string,
        public username: string,
        public imageUrl?: string,
        ) {}

    }
