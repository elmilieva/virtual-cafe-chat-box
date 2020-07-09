import React, { FC } from "react";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Typography,
  Button,
  FormGroup,
} from "@material-ui/core";
import { Product } from "../../model/product.model";
import { ProductCallback } from "../../shared/shared-types";

const useStyles = makeStyles((theme) => ({
  root: {
      margin: theme.spacing(1),
      padding: "1rem",
    },
    space: {
        margin: "1rem",
    },
    center: {
        textAlign: "center",
    }
}));

interface Props {
    handleProductCreate: ProductCallback;
}

export const ProductForm: FC<Props> = ({handleProductCreate}) => {

  const classes = useStyles();
  return (
      <Formik
        initialValues={{
          name: "",
          imageUrl: "",
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          const product = {
            name: values.name,
            imageUrl: values.imageUrl
          } as Product;
          handleProductCreate(product);
        }}
      >
        {(props) => (
          <div>
            <form className={classes.root} onSubmit={props.handleSubmit}>
              <Typography className={classes.center} variant="h4">Add Product</Typography>
              <FormGroup>
                <TextField
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="name"
                  id="outlined-basic"
                  label="Product Name"
                  variant="outlined"
                  className={classes.space}
                />
                <TextField
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="imageUrl"
                  id="outlined-basic"
                  label="Product Image"
                  variant="outlined"
                  className={classes.space}
                />
                <Button className={classes.space} variant="contained" color="primary" type="submit">
                  Add
                </Button>
              </FormGroup>
            </form>
          </div>
        )}
      </Formik>
  );
};
