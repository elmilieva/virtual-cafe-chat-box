import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { Home } from "./Components/Home/Home";
import { Nav } from "./Components/Nav/Nav";
import { Route, Switch, useHistory } from "react-router";
import { UserCallback, MessageCallback } from "./shared/shared-types";
import UserService from "./service/user-service";
import { Admin } from "./Components/Admin/Admin";
import { User } from "./model/user.model";
import { EditUser } from "./Components/EditUser/EditUser";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { RoomForm } from "./Components/RoomForm/RoomForm";
import { ChatRoom } from "./Components/ChatRoom/ChatRoom";
import io from "socket.io-client";
import { Message } from "./model/message.model";
import { useSelector } from "react-redux";
import { RootState } from "./app/rootReducer";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
const SOCKET_IO_URL = "http://localhost:9000/";
const socket = io(SOCKET_IO_URL);
interface indexState {
  loginClicked: boolean;
}

function App() {
  const currentUser = useSelector((state: RootState) => state.auth.loggedUser);
  const [messages, setMessages] = useState<Message[]>([
    new Message(
      new User(
        "1",
        "Chat",
        "Bot",
        "32",
        "32",
        "32",
        "https://core3.imgix.net/59afd70fd1abalogo1250x250.png?auto=format,compress&w=480&fit=max&"
      ),
      "Welcome to chat!"
    ),
  ]);
  const [initialized, setInitialized] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | undefined>(undefined);
  useEffect(() => {
    UserService.getAllUsers().then((users) => setUsers(users));
    if (!initialized) {
      connectToRoom();
    }
  }, [initialized]);

  const history = useHistory();

  const handleSubmitMessage: MessageCallback = (message) => {
    //const data = `{"user": "${message.user?.firstName+" "+message.user?.lastName}", "message": "${message.message}"}`;
    socket.emit("chat message", message);
  };

  const connectToRoom = () => {
    socket.on("chat message", (data: Message) => {
      setMessages((messages) => [...messages, data]);
    });
    setInitialized(true);
  };

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
  };

  const handleDeleteUser: UserCallback = async (user) => {
    await UserService.deleteUser(user._id);
    UserService.getAllUsers().then((users) => setUsers(users));
    history.push("/admin");
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  // change <nav> to a <Navigation> react component
  // for register have a handler that takes the newly created react model User
  // and sends it to the UserService, which sends it to the server POST user endpoint
  //https://codepen.io/marko-zub/pen/NpYwyr
  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <Nav></Nav>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/admin">
            <Admin
              userList={users}
              onEdit={handleSetUserToEdit}
              onDelete={handleDeleteUser}
            ></Admin>
          </Route>
          <ProtectedRoute exact path="/add-room">
            <RoomForm users={users} handleRegister={handleEditUser}></RoomForm>
          </ProtectedRoute>
          <Route exact path="/chatroom">
            <ChatRoom
              messages={messages}
              handleSubmitMessage={handleSubmitMessage}
              currentUser={currentUser}
            ></ChatRoom>
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
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
