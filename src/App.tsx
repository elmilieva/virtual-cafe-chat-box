import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { Home } from "./Components/Home/Home";
import { Nav } from "./Components/Nav/Nav";
import { Route, Switch, useHistory } from "react-router";
import { UserCallback } from "./shared/shared-types";
import UserService from "./service/user-service";
import { Admin } from "./Components/Admin/Admin";
import { User } from "./model/user.model";
import { EditUser } from "./Components/EditUser/EditUser";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { RoomForm } from "./Components/RoomForm/RoomForm";
import ChatRoom from "./Components/ChatRoom/ChatRoom";

interface indexState {
  loginClicked: boolean;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | undefined>(undefined);
  useEffect(() => {
    UserService.getAllUsers().then((users) => setUsers(users));
  }, []);

  const history = useHistory();

  const handleSubmitUser: UserCallback = (user) => {
    if (user._id) {
      //Edit
      UserService.updateUser(user).then((edited) => {
        //setUsers(users.map((p) => (p.id === edited.id ? user : p)));
      });
    } else {
      //Create
      UserService.createNewUser(user).then((created) => {
        //setUsers(users.concat(created));
      });
    }
    history.push("/users");
  };

  const handleSetUserToEdit: UserCallback = (user) => {
    setUserToEdit(user);
    history.push(`/edit-user/${user._id}`);
  };

  const handleEditUser: UserCallback = async (user) => {
    await UserService.updateUser(user);
    UserService.getAllUsers().then((users) => setUsers(users));
    history.push("/admin");
  }

  const handleDeleteUser: UserCallback = async (user) => {
    await UserService.deleteUser(user._id);
    UserService.getAllUsers().then((users) => setUsers(users));
    history.push("/admin");
  }

  // change <nav> to a <Navigation> react component
  // for register have a handler that takes the newly created react model User
  // and sends it to the UserService, which sends it to the server POST user endpoint
  //https://codepen.io/marko-zub/pen/NpYwyr
  return (
    <React.Fragment>
      <Nav></Nav>
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/admin">
          <Admin userList={users} onEdit={handleSetUserToEdit} onDelete={handleDeleteUser}></Admin>
        </Route>
        <ProtectedRoute exact path="/add-room">
          <RoomForm users={users} handleRegister={handleEditUser}></RoomForm>
        </ProtectedRoute>
        <Route exact path="/chatroom">
          <ChatRoom></ChatRoom>
        </Route>
        <Route exact path="/register">
          <Register handleRegister={handleSubmitUser}></Register>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/edit-user/:userId">
          <EditUser user={userToEdit} onEditUser={handleEditUser} />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
