import React, { FC, useState } from "react";
import { Formik } from "formik";
import "./RoomForm.css";
import { UserCallback } from "../../shared/shared-types";
import { User } from "../../model/user.model";
import { Room } from "../../model/room.model";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  createMuiTheme,
  ThemeProvider,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "70%",
    },
  },
}));

interface Props {
  handleRegister: UserCallback;
  users: User[];
}

export const RoomForm: FC<Props> = ({ handleRegister, users }) => {
  const initialStateObject: { [k: string]: any } = {};
  users.map((u) => {
    initialStateObject[u._id] = false;
    return undefined;
  });
  const [state, setState] = useState<Record<string, any>>(initialStateObject);
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.currentTarget.name]: event.target.checked });
  };
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <Formik
        initialValues={{
          roomName: "",
          participants: [],
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          const room = {
            roomName: values.roomName,
            participants: users.filter((u) =>
              u._id in state && state[u._id] ? true : false
            ),
          } as Room;
          // handleRegister(room);
          console.log(room);
        }}
      >
        {(props) => (
          <div className="Room-form">
            <form className={classes.root} onSubmit={props.handleSubmit}>
              <Typography variant="h3">Create Room</Typography>
              <FormGroup>
                <TextField
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="roomName"
                  id="outlined-basic"
                  label="Room Name"
                  variant="outlined"
                />
                {users.map((u) => (
                  <FormControlLabel key={u._id}
                    control={
                      <Checkbox
                        checked={state[u._id]}
                        onChange={handleChange}
                        name={u._id}
                        color="primary"
                      />
                    }
                    label={u.firstName + " " + u.lastName}
                  />
                ))}

                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </FormGroup>
            </form>
          </div>
        )}
      </Formik>
    </ThemeProvider>
  );
};
