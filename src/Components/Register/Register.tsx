import React, { FC } from "react";
import { Formik } from "formik";
import "./Register.css";
import { UserCallback } from "../../shared/shared-types";
import { User } from "../../model/user.model";
import TextField from "@material-ui/core/TextField";
import { Button, Typography, FormGroup, makeStyles } from "@material-ui/core";

interface Props {
  handleRegister: UserCallback;
}

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

export const Register: FC<Props> = ({ handleRegister }) => {
  const classes = useStyles();
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
    >
      {(props) => (
        <div>
          <form className={classes.root} onSubmit={props.handleSubmit}>
            <Typography className={classes.center} variant="h4">
              Register
            </Typography>
            <FormGroup>
              <TextField
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="firstName"
                variant="outlined"
                className={classes.space}
                label="First Name"
                autoComplete="off"
              />

              <TextField
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

              <Button className={classes.space} variant="contained" color="primary" type="submit">
                Register
              </Button>
            </FormGroup>
          </form>
        </div>
      )}
    </Formik>
  );
};
