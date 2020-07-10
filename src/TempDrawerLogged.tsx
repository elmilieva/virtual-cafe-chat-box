import React, { FC } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ChatIcon from "@material-ui/icons/Chat";
import MenuIcon from "@material-ui/icons/Menu";
import CheckIcon from "@material-ui/icons/Check";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { IUser } from "./model/user.model";
import { Product } from "./model/product.model";
import { ProductCallback } from "./shared/shared-types";
import { BoughtProduct } from "./model/boughtProduct.model";
import CircularProgressWithLabel from "./Components/CircularProgress/CircularProgress";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  anchor: {
    color: "white",
    textDecoration: "none",
  },
  right: {
    position: "absolute",
    right: "0",
    marginRight: "1rem",
  },
});

type Anchor = "top" | "left" | "bottom" | "right";

interface Props {
  currentUser: IUser | undefined;
  products: Product[];
  boughtProducts: BoughtProduct[];
  handlePurchasedProduct: ProductCallback;
}

export const TemporaryDrawerLogged: FC<Props> = ({
  currentUser,
  products,
  handlePurchasedProduct,
  boughtProducts,
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  function setPurchasedProduct(p: Product) {
    handlePurchasedProduct(p);
  }

  const productList = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {products.map((p) => (
          <ListItem
            button
            onClick={() => {
              setPurchasedProduct(p);
            }}
          >
            <ListItemAvatar>
              <Avatar src={p.imageUrl} />
            </ListItemAvatar>
            <ListItemText>{p.name}</ListItemText>
          </ListItem>
        ))}
        <Divider></Divider>
        <ListItem>
          <ListItemText>Purchased Products</ListItemText>
        </ListItem>
        {boughtProducts.map((b) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar src={b.product?.imageUrl} />
            </ListItemAvatar>
            <ListItemText>
              {b.product?.name}
              {b.state === "ready" ? (<CheckIcon/>) : (<CircularProgressWithLabel/>)}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavLink className={classes.anchor} to="/">
          <ListItem button key={"Home"}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </NavLink>
        <Divider></Divider>
        <NavLink className={classes.anchor} to="/chat-room">
          <ListItem button key={"chat-room"}>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary={"Chat Room"} />
          </ListItem>
        </NavLink>
        {currentUser?.roles.find((x) => x === 1) ? (
          <NavLink className={classes.anchor} to="/admin">
            <ListItem button key={"admin"}>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary={"Admin"} />
            </ListItem>
          </NavLink>
        ) : (
          ""
        )}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Virtual Cafe
          </Typography>
          <IconButton
            className={classes.right}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("right", true)}
          >
            <LocalCafeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {productList("right")}
      </Drawer>
    </div>
  );
};
