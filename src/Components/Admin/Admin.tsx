import React, { FC } from "react";
import { User } from "../../model/user.model";
import { UserCallback } from "../../shared/shared-types";
import { NavLink } from "react-router-dom";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
  Button,
  Typography,
  Avatar,
  List,
  ListItem,
} from "@material-ui/core";
import { Product } from "../../model/product.model";
import { ProductCallback } from "./../../shared/shared-types";
import { Room } from "../../model/room.model";
import ListItemText from "@material-ui/core/ListItemText";

// properties from parent
interface Props {
  userList: User[];
  products: Product[];
  onEdit: UserCallback;
  onDelete: UserCallback;
  onEditProduct: ProductCallback;
  onDeleteProduct: ProductCallback;
  roomList: Room[];
}

// styles and classes for materialUI
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  space: {
    margin: "1rem",
  },
  tableContainer: {
    minWidth: 650,
    background: "none",
  },
});

// Admin component with parent props
export const Admin: FC<Props> = ({
  userList,
  onEdit,
  onDelete,
  products,
  onEditProduct,
  onDeleteProduct,
  roomList,
}) => {
  // classes for materialUI
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.space}>
        <Typography variant="h4">Users</Typography>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((u) => (
                <TableRow key={u._id}>
                  <TableCell>{u.firstName}</TableCell>
                  <TableCell align="right">{u.lastName}</TableCell>
                  <TableCell align="right">{u.username}</TableCell>
                  <TableCell align="right">{u.email}</TableCell>
                  <TableCell align="right">
                    <Avatar style={{ float: "right" }} src={u.imageUrl} />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onEdit(u)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onDelete(u)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br></br>
        <br></br>
        <br></br>
        <Typography variant="h4">Products</Typography>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell align="right">
                    <Avatar style={{ float: "right" }} src={p.imageUrl} />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onEditProduct(p)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => onDeleteProduct(p)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <NavLink to="/add-product">
          <Button color="primary" variant="contained">
            Add Product
          </Button>
        </NavLink>
        <br></br>
        <br></br>
        <br></br>
        <Typography variant="h4">Rooms</Typography>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Room Name</TableCell>
                <TableCell>Participants</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomList.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.roomName}</TableCell>
                  <TableCell>
                    <List style={{ margin: "0", padding: "0" }}>
                      {r.participants.map((p) => (
                        <ListItem style={{ margin: "0", padding: "0" }}>
                          <ListItemText style={{ margin: "0", padding: "0" }}>
                            {p.firstName} {p.lastName} ({p.username})
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      disabled
                      color="primary"
                      // onClick={() => onDeleteProduct(r)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
};
