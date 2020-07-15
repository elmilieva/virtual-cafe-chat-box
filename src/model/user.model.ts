import { Indentifiable, IdType } from "../shared/shared-types";
export interface IUser extends Indentifiable {
  _id: IdType;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  imageUrl?: string;
  username: string;
  roles: Role[];
}

export enum Role {
  USER,
  ADMIN,
}

export class User implements IUser {
  constructor(
    public _id: IdType,
    public firstName: string,
    public lastName: string,
    public password: IdType,
    public email: string,
    public username: string,
    public imageUrl?: string,
    public roles: Role[] = [Role.USER]
  ) {}
}
