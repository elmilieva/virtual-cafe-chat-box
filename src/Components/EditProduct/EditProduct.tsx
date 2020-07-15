import React, { FC } from "react";
import { Product } from "../../model/product.model";
import { ProductCallback } from "../../shared/shared-types";
import { Formik } from "formik";
import { makeStyles, TextField, Typography, FormGroup, Button } from "@material-ui/core";
import * as Yup from "yup";

// properties from parent
interface Props {
  product: Product | undefined;
  onEditProduct: ProductCallback;
}

// styles and classes for materialUI
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
  },
}));

// EditProduct component with properties from parent
export const EditProduct: FC<Props> = ({ product, onEditProduct }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
          _id: product?._id,
          name: product?.name,
          imageUrl: product?.imageUrl,
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        const product = {
            _id: values._id,
            name: values.name,
            imageUrl: values.imageUrl,     
        } as Product;
       onEditProduct(product);
      }}
      validateOnChange
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Name is required!").min(2,'Too Short!').max(40, 'Too Long!'),
      })}
    >
      {(props) => (
        <div>
          <form className={classes.root} onSubmit={props.handleSubmit}>
            <Typography className={classes.center} variant="h4">
              Edit Product
            </Typography>
            <FormGroup>
              <TextField
                error={(props.errors.name && props.touched.name) ? true : false}
                helperText={props.errors.name && props.touched.name ? props.errors.name : ""}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="name"
                variant="outlined"
                className={classes.space}
                label="Product Name"
                autoComplete="off"
                defaultValue={product?.name}
              />
              <TextField
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={classes.space}
                name="imageUrl"
                label="Product Picture"
                type="text"
                style={{}}
                autoComplete="off"
                defaultValue={product?.imageUrl}
              />
              
              <Button
                className={classes.space}
                variant="contained"
                color="primary"
                type="submit"
              >
                Edit
              </Button>
            </FormGroup>
          </form>
        </div>
      )}
    </Formik>
  );
};
