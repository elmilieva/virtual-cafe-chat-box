import React, { FC } from "react";
import { User } from "../../model/user.model";
import { UserCallback } from "../../shared/shared-types";
import { Formik } from "formik";
import { makeStyles, TextField, Typography, FormGroup, Button } from "@material-ui/core";
import * as Yup from "yup";

// properties from parent
interface Props {
  user: User | undefined;
  onEditUser: UserCallback;
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

// EditUser component with properties from parent
export const EditUser: FC<Props> = ({ user, onEditUser }) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
          firstName: user?.firstName,
          lastName: user?.lastName,
          imageUrl: user?.imageUrl,
          email: user?.email,
          _id: user?._id,
          roles: user?.roles

      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        const user = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            imageUrl: values.imageUrl,
            _id: values._id,
            roles: values.roles
        } as User;
       onEditUser(user);
      }}
      validateOnChange
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required("First Name is required!").min(2,'Too Short!').max(40, 'Too Long!'),
        lastName: Yup.string().required("Last Name is required!").min(2, 'Too Short!').max(40, 'Too Long!'),
        email: Yup.string().required("Email is required!").email(),
        
      })}
    >
      {(props) => (
        <div>
          <form className={classes.root} onSubmit={props.handleSubmit}>
            <Typography className={classes.center} variant="h4">
              Edit User
            </Typography>
            <FormGroup>
              <TextField
                error={(props.errors.firstName && props.touched.firstName) ? true : false}
                helperText={props.errors.firstName && props.touched.firstName ? props.errors.firstName : ""}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="firstName"
                variant="outlined"
                className={classes.space}
                label="First Name"
                autoComplete="off"
                defaultValue={user?.firstName}
              />

              <TextField
              error={(props.errors.lastName && props.touched.lastName) ? true : false}
              helperText={props.errors.lastName && props.touched.lastName ? props.errors.lastName : ""}
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={classes.space}
                name="lastName"
                label="Last Name"
                type="text"
                style={{}}
                autoComplete="off"
                defaultValue={user?.lastName}
              />

              <TextField
               error={(props.errors.email && props.touched.email) ? true : false}
               helperText={props.errors.email && props.touched.email ? props.errors.email : ""}
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={classes.space}
                name="email"
                label="E-mail"
                type="email"
                style={{}}
                autoComplete="off"
                defaultValue={user?.email}
              />

              <TextField
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={classes.space}
                name="imageUrl"
                label="Profile Picture"
                type="text"
                style={{}}
                autoComplete="off"
                value={props.values.imageUrl}
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
