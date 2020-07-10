import React, { ReactElement, useRef } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitLogin } from "../../features/auth/authSlice";
import {
  TextField,
  Button,
  Typography,
  makeStyles,
  FormGroup,
} from "@material-ui/core";
import { Formik } from "formik";

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

export default function Login(): ReactElement {
  const dispatch = useDispatch();
  const history = useHistory();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const classes = useStyles();

  function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(
      submitLogin(
        {
          username: usernameRef.current?.value || "",
          password: passwordRef.current?.value || "",
        },
        history
      )
    );
  }
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        dispatch(
          submitLogin(
            {
              username: values.username || "",
              password: values.password || "",
            },
            history
          )
        );
      }}
    >
      {(props) => (
        <div>
          <form
            autoComplete="off"
            onSubmit={props.handleSubmit}
            className="form"
          >
            <Typography className={classes.center} variant="h4">
              Sign In
            </Typography>
            <FormGroup>
              <TextField
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                variant="outlined"
                className={classes.space}
                name="username"
                label="Username"
                autoComplete="off"
              />

              <TextField
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                variant="outlined"
                className={classes.space}
                name="password"
                label="Password"
                type="password"
                autoComplete="off"
              />

              <Button className={classes.space} variant="contained" color="primary" type="submit">
                Login
              </Button>
            </FormGroup>
          </form>
        </div>
      )}
    </Formik>
  );
}
