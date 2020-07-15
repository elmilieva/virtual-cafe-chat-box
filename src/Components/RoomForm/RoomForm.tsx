import React, { FC, useState } from "react";
import { Formik } from "formik";
import { RoomCallback } from "../../shared/shared-types";
import { User } from "../../model/user.model";
import { Room } from "../../model/room.model";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import {
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
} from "@material-ui/core";

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
    margin: "0 1rem",
  },
  center: {
    textAlign: "center",
  },
}));

// properties from parent
interface Props {
  handleRoomCreate: RoomCallback;
  users: User[];
}

// RoomForm component with properties from parent
export const RoomForm: FC<Props> = ({ handleRoomCreate, users }) => {
  const initialStateObject: { [k: string]: any } = {};
  const matches = useMediaQuery("(min-width:600px)");
  users.map((u) => {
    initialStateObject[u._id] = false;
    return undefined;
  });
  const [state, setState] = useState<Record<string, any>>(initialStateObject);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.currentTarget.name]: event.target.checked });
  };
  const classes = useStyles();
  return (
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
        handleRoomCreate(room);
      }}
    >
      {(props) => (
        <div className={matches ? classes.root : classes.mobile}>
          <form onSubmit={props.handleSubmit}>
            <Typography className={classes.center} variant="h3">
              Create Room
            </Typography>
            <FormGroup>
              <TextField
                className={classes.space}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name="roomName"
                id="outlined-basic"
                label="Room Name"
                variant="outlined"
              />
              {users.map((u) => (
                <FormControlLabel
                  key={u._id}
                  control={
                    <Checkbox
                      className={classes.space}
                      checked={state[u._id]}
                      onChange={handleChange}
                      name={u._id}
                      color="primary"
                    />
                  }
                  label={
                    u.firstName + " " + u.lastName + " (" + u.username + ")"
                  }
                />
              ))}

              <Button
                className={classes.space}
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </FormGroup>
          </form>
        </div>
      )}
    </Formik>
  );
};
