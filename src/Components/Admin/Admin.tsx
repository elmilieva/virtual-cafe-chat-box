import React, { FC } from "react";
import "./Admin.css";
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
} from "@material-ui/core";
import { Product } from "../../model/product.model";
import { ProductCallback } from './../../shared/shared-types';

interface Props {
  userList: User[];
  products: Product[];
  onEdit: UserCallback;
  onDelete: UserCallback;
  onEditProduct: ProductCallback;
}

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

export const Admin: FC<Props> = ({ userList, onEdit, onDelete, products, onEditProduct }) => {
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
                  <TableCell align="right"><Avatar style={{float: "right"}} src={u.imageUrl}/></TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => onEdit(u)}>Edit</Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => onDelete(u)}>Delete</Button>
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
                  <TableCell align="right"><Avatar style={{float: "right"}} src={p.imageUrl}/></TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => onEditProduct(p)}>Edit</Button>
                  </TableCell>
                  <TableCell align="right">
                    {/* <Button onClick={() => onDelete(p)}>Delete</Button> */}
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
      </div>
    </React.Fragment>
  );
};
