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
import TemporaryDrawer from "./Components/TempDrawer/TempDrawer";
import { TemporaryDrawerLogged } from "./Components/TempDrawerLogged/TempDrawerLogged";
import { Product } from "./model/product.model";
import ProductService from "./service/product-service";
import { ProductForm } from "./Components/ProductForm/ProductForm";
import Alert from "./Components/Alert/Alert";
import { BoughtProduct } from "./model/boughtProduct.model";
import { EditProduct } from "./Components/EditProduct/EditProduct";
import roomService from "./service/room-service";
import { ChatRooms } from "./Components/ChatRooms/ChatRooms";

// connecting the socket.io client to the server
const SOCKET_IO_URL = "http://localhost:9000/";
const socket = io(SOCKET_IO_URL);

function App() {
  const [boughtProducts, setBoughtProducts] = useState<BoughtProduct[]>([]);
  const [purchasedProducts, setPurchasedProducts] = useState<Product[]>([]);
  const [productReadyMessage, setProductReadyMessage] = useState<string>("");
  const timeoutRef = React.useRef<any>(null);
  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      // for the last bought product (or 1st in the list) we set the timeout to 5 seconds
      // and then update the last bought (or 1st) product's state from making to ready
      // then set update the hooks
      if (purchasedProducts[purchasedProducts.length - 1] !== undefined) {
        const updatedBoughtProducts = boughtProducts.map((item, index) => {
          if (index === boughtProducts.length - 1) {
            item.state = "ready";
          }
          return item;
        });
        setBoughtProducts(updatedBoughtProducts);
        setProductReadyMessage(
          "Your " +
            purchasedProducts[purchasedProducts.length - 1]?.name +
            " is ready!"
        );
      }
    }, 5000);
  }, [purchasedProducts, boughtProducts]);
  const currentUser = useSelector((state: RootState) => state.auth.loggedUser);
  const [activeRoom, setActiveRoom] = useState<Room | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
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
    ProductService.getAllProducts().then((products) => setProducts(products));
    if (!initialized) {
      connectToRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    roomService.getAllRooms().then((rooms) => setRooms(rooms));
  }, [rooms]);

  const history = useHistory();

  const handleSubmitMessage: MessageCallback = (message) => {
    socket.emit("chat message", message);
  };

  const joinRoom = (room: Room) => {
    socket.emit("join room", room);
  };

  const connectToRoom = () => {
    socket.on("chat message", (data: Message) => {
      setMessages((messages) => [...messages, data]);
    });
    socket.on("connectToRoom", (data: string) => {
      console.log(data);
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
  };

  const handleSubmitUser: UserCallback = (user) => {
    if (user._id) {
      //Edit
      UserService.updateUser(user).then((edited) => {});
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
    await ProductService.updateProduct(product);
    ProductService.getAllProducts().then((products) => setProducts(products));
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

  const handleDeleteProduct: ProductCallback = async (product) => {
    await ProductService.deleteProduct(product._id);
    ProductService.getAllProducts().then((products) => setProducts(products));
    history.push("/admin");
  };

  const handleRoomCreate: RoomCallback = async (room) => {
    roomService.createNewRoom(room).then((created) => {
      setRooms((rooms) => [...rooms, created]);
      joinRoom(created);
      setActiveRoom(room);
      setMessages([]);
      history.push(`/chat-room/${created._id}`);
    });
  };

  const handleSetActiveRoom: RoomCallback = async (room) => {
    joinRoom(room);
    setActiveRoom(room);
    setMessages([]);
    history.push(`/chat-room/${room._id}`);
  };

  const handleProductCreate: ProductCallback = (product) => {
    if (product._id) {
      ProductService.updateProduct(product).then((edited) => {
        setProducts(products.map((p) => (p._id === edited.id ? product : p)));
      });
    } else {
      ProductService.createNewProduct(product).then((created) => {
        setProducts((products) => [...products, created]);
      });
    }
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
            activeRoom={activeRoom}
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
              roomList={rooms}
              userList={users}
              onEdit={handleSetUserToEdit}
              onDelete={handleDeleteUser}
              onEditProduct={handleSetProductToEdit}
              onDeleteProduct={handleDeleteProduct}
            ></Admin>
          </ProtectedRoute>
          <ProtectedRoute exact path="/add-room">
            <RoomForm
              users={users}
              handleRoomCreate={handleRoomCreate}
            ></RoomForm>
          </ProtectedRoute>
          <ProtectedRoute exact path="/chat-rooms">
            <ChatRooms
              setActiveRoom={handleSetActiveRoom}
              currentUser={currentUser}
              rooms={rooms}
            ></ChatRooms>
          </ProtectedRoute>
          <ProtectedRoute exact path="/chat-room/:roomId">
            <ChatRoom
              activeRoom={activeRoom}
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
          <ProtectedRoute exact path="/edit-product/:productId">
            <EditProduct
              product={productToEdit}
              onEditProduct={handleEditProduct}
            />
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
