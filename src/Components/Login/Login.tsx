import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitLogin } from "../../features/auth/authSlice";
import {
  TextField,
  Button,
  Typography,
  makeStyles,
  FormGroup,
  useMediaQuery,
} from "@material-ui/core";
import { Formik } from "formik";

// styles and classes for materialUI
const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    margin: "0 auto",
  },
  mobile:{
    width: "100%",
  },
  space: {
    margin: "1rem",
  },
  center: {
    textAlign: "center",
  },
}));

// Login component
export default function Login(): ReactElement {
  const matches = useMediaQuery('(min-width:600px)');
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
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
        <div className={matches ? classes.root : classes.mobile}>
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
