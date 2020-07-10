import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { Home } from "./Components/Home/Home";
import { Route, Switch, useHistory } from "react-router";
import {
  UserCallback,
  MessageCallback,
  RoomCallback,
  ProductCallback,
} from "./shared/shared-types";
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
import { Room } from "./model/room.model";
import TemporaryDrawer from "./TempDrawer";
import { TemporaryDrawerLogged } from "./TempDrawerLogged";
import { Product } from "./model/product.model";
import productService from "./service/product-service";
import { ProductForm } from "./Components/ProductForm/ProductForm";
import { validateYupSchema } from "formik";
import Alert from "./Components/Alert/Alert";
import { BoughtProduct } from "./model/boughtProduct.model";

const SOCKET_IO_URL = "http://localhost:9000/";
const socket = io(SOCKET_IO_URL);

interface indexState {
  loginClicked: boolean;
}

function App() {
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [productReadyMessage, setProductReadyMessage] = useState<string>("");
  const timeoutRef = React.useRef<any>(null);
  function productReady() {
    setProductReadyMessage(
      "Your " +
        purchasedProducts[purchasedProducts.length - 1]?.name +
        " is ready!"
    );
  }
  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (purchasedProducts[purchasedProducts.length - 1] !== undefined) {
        const updatedBoughtProducts = boughtProducts.map((item, index) => {
          if (index === boughtProducts.length - 1) {
            item.state = "ready";
          }
          return item;
        });
        console.log(updatedBoughtProducts);
        setBoughtProducts(updatedBoughtProducts);
        productReady();
        //setPurchasedProducts();
      }
    }, 5000);
  }, [purchasedProducts, boughtProducts]);
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
  const [products, setProducts] = useState<Product[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [userToEdit, setUserToEdit] = useState<User | undefined>(undefined);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(
    undefined
  );
  useEffect(() => {
    UserService.getAllUsers().then((users) => setUsers(users));
    productService.getAllProducts().then((products) => setProducts(products));
    if (!initialized) {
      connectToRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handlePurchasedProduct: ProductCallback = (product) => {
    setPurchasedProducts((purchasedProducts) => [
      ...purchasedProducts,
      product,
    ]);
    setBoughtProducts((boughtProducts) => [
      ...boughtProducts,
      new BoughtProduct(product, "making"),
    ]);
    console.log(boughtProducts);
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
        setUsers((users) => [...users, created]);
      });
    }
    history.push("/login");
  };

  const handleSetUserToEdit: UserCallback = (user) => {
    setUserToEdit(user);
    history.push(`/edit-user/${user._id}`);
  };
  const handleSetProductToEdit: ProductCallback = (product) => {
    setProductToEdit(product);
    history.push(`/edit-product/${product._id}`);
  };
  const handleEditProduct: ProductCallback = async (product) => {
    await productService.updateProduct(product);
    productService.getAllProducts().then((products) => setProducts(products));
    history.push("/admin");
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

  const handleRoomCreate: RoomCallback = (room) => {
    setRooms((rooms) => [...rooms, room]);
    history.push("/chatroom");
  };

  const handleProductCreate: ProductCallback = (product) => {
    productService.createNewProduct(product).then((created) => {
      setProducts((products) => [...products, created]);
    });
    history.push("/admin");
  };

  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        {currentUser ? (
          <TemporaryDrawerLogged
            boughtProducts={boughtProducts}
            handlePurchasedProduct={handlePurchasedProduct}
            products={products}
            currentUser={currentUser}
          />
        ) : (
          <TemporaryDrawer />
        )}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <ProtectedRoute exact path="/admin">
            <Admin
              products={products}
              userList={users}
              onEdit={handleSetUserToEdit}
              onDelete={handleDeleteUser}
              onEditProduct={handleSetProductToEdit}
            ></Admin>
          </ProtectedRoute>
          <ProtectedRoute exact path="/add-room">
            <RoomForm
              users={users}
              handleRoomCreate={handleRoomCreate}
            ></RoomForm>
          </ProtectedRoute>
          <ProtectedRoute exact path="/chat-room">
            <ChatRoom
              rooms={rooms}
              messages={messages}
              handleSubmitMessage={handleSubmitMessage}
              currentUser={currentUser}
            ></ChatRoom>
          </ProtectedRoute>
          <ProtectedRoute exact path="/add-product">
            <ProductForm
              handleProductCreate={handleProductCreate}
            ></ProductForm>
          </ProtectedRoute>
          <Route exact path="/join-room"></Route>
          <Route exact path="/register">
            <Register handleRegister={handleSubmitUser}></Register>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <ProtectedRoute exact path="/edit-user/:userId">
            <EditUser user={userToEdit} onEditUser={handleEditUser} />
          </ProtectedRoute>
        </Switch>
      </ThemeProvider>
      {productReadyMessage !== "" && (
        <Alert key={productReadyMessage} severity="success">
          {productReadyMessage}
        </Alert>
      )}
    </React.Fragment>
  );
}

export default App;
