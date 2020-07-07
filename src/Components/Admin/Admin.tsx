import React, { FC } from "react";
import "./Admin.css";
import { User } from "../../model/user.model";
import { UserCallback } from "../../shared/shared-types";

interface Props {
  userList: User[];
  onEdit: UserCallback;
  onDelete: UserCallback;
}

export const Admin: FC<Props> = ({ userList, onEdit, onDelete }) => {
  return (
    <React.Fragment>
      <div className="main">
        <h1>Registered Users</h1>
        <table>
          <thead>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Username</th>
              <th>Email</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
          {userList.map((u) => (
            <tr key={u._id}>
              <td>{u.firstName}</td>
              <td>{u.lastName}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.imageUrl}</td>
              <td><button onClick={() => onEdit(u)} >Edit</button></td>
              <td><button onClick={() => onDelete(u)} >Delete</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};
