import React, { FC } from "react";
import { Formik } from "formik";
import { UserCallback } from "../../shared/shared-types";
import { User } from "../../model/user.model";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Typography,
  FormGroup,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import * as Yup from "yup";

// properties from parent
interface Props {
  handleRegister: UserCallback;
}

// styles and classes for materialUI
const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    margin: "0 auto",
  },
  mobile: {
    width: "100%",
  },
  space: {
    margin: "1rem",
  },
  center: {
    textAlign: "center",
  },
}));

// Register component with properties from parent
export const Register: FC<Props> = ({ handleRegister }) => {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:600px)");
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        imageUrl: "",
        email: "",
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        const user = {
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          password: values.password,
          email: values.email,
          imageUrl: values.imageUrl,
          roles: [0],
        } as User;
        handleRegister(user);
      }}
      validateOnChange
      validationSchema={Yup.object().shape({
        firstName: Yup.string()
          .required("First Name is required!")
          .min(2, "Too Short!")
          .max(40, "Too Long!"),
        lastName: Yup.string()
          .required("Last Name is required!")
          .min(2, "Too Short!")
          .max(40, "Too Long!"),
        username: Yup.string()
          .required("Username is required!")
          .min(2, "Too Short!")
          .max(40, "Too Long!"),
        password: Yup.string()
          .required("No password provided")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

        email: Yup.string().required("Email is required!").email(),
      })}
    >
      {(props) => (
        <div className={matches ? classes.root : classes.mobile}>
          <form onSubmit={props.handleSubmit}>
            <Typography className={classes.center} variant="h4">
              Register
            </Typography>
            <FormGroup>
              <TextField
                error={
                  props.errors.firstName && props.touched.firstName
                    ? true
                    : false
                }
                helperText={
                  props.errors.firstName && props.touched.firstName
                    ? props.errors.firstName
                    : ""
                }
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="firstName"
                variant="outlined"
                className={classes.space}
                label="First Name"
                autoComplete="off"
              />

              <TextField
                error={
                  props.errors.lastName && props.touched.lastName ? true : false
                }
                helperText={
                  props.errors.lastName && props.touched.lastName
                    ? props.errors.lastName
                    : ""
                }
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={classes.space}
                name="lastName"
                label="Last Name"
                type="text"
                style={{}}
                autoComplete="off"
              />

              <TextField
                error={
                  props.errors.username && props.touched.username ? true : false
                }
                helperText={
                  props.errors.username && props.touched.username
                    ? props.errors.username
                    : ""
                }
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={classes.space}
                name="username"
                label="Username"
                type="text"
                style={{}}
                autoComplete="off"
              />

              <TextField
                error={
                  props.errors.password && props.touched.password ? true : false
                }
                helperText={
                  props.errors.password && props.touched.password
                    ? props.errors.password
                    : ""
                }
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={classes.space}
                name="password"
                label="Password"
                type="password"
                style={{}}
                autoComplete="off"
              />

              <TextField
                error={props.errors.email && props.touched.email ? true : false}
                helperText={
                  props.errors.email && props.touched.email
                    ? props.errors.email
                    : ""
                }
                variant="outlined"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                className={classes.space}
                name="email"
                label="E-mail"
                type="email"
                style={{}}
                autoComplete="off"
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
                Register
              </Button>
            </FormGroup>
          </form>
        </div>
      )}
    </Formik>
  );
};
