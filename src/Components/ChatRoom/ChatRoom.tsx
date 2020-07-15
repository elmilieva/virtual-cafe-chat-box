import React, { FC } from "react";

import { MessageCallback } from "../../shared/shared-types";
import { Message } from "../../model/message.model";
import { IUser } from "./../../model/user.model";
import {
  Grid,
  Button,
  FormGroup,
  TextField,
  Typography,
  makeStyles,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { Formik } from "formik";
import { Room } from "../../model/room.model";

// properties from parent
interface Props {
  currentUser: IUser | undefined;
  handleSubmitMessage: MessageCallback;
  messages: Message[];
  activeRoom: Room | undefined;
}

// styles and classes for materialUI
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "70%",
    },
  },
  chatForm: {
    position: "fixed",
    bottom: theme.spacing(1),
    right: theme.spacing(0),
    width: "100%",
  },
  chatMessageField: {
    width: "100%",
    //margin: "1rem",
  },
  inline: {
    display: "inline",
  },
}));

// ChatRoom component with properties from parent
export const ChatRoom: FC<Props> = ({
  handleSubmitMessage,
  currentUser,
  messages,
  activeRoom
}) => {
  const classes = useStyles();
  return (
    <Grid container>
      <div
        className="messages-container"
      >
        <List>
          {messages.map((m, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar src={m.user?.imageUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={m.user?.firstName + " " + m.user?.lastName}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    ></Typography>
                    {m.message}
                  </React.Fragment>
                }
              >
                {m.user?.firstName} {m.user?.lastName}: {m.message}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
      <Formik
        initialValues={{
          message: "",
          user: currentUser,
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
          const message = {
            user: currentUser,
            message: values.message,
            roomName: activeRoom?.roomName
          } as Message;
          handleSubmitMessage(message);
          values.message = "";
        }}
      >
        {(props) => (
          <div className="Room-form">
            <form className={classes.chatForm} autoComplete="off" onSubmit={props.handleSubmit}>
              <FormGroup>
                <TextField
                  className={classes.chatMessageField}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  name="message"
                  id="outlined-basic"
                  label="Message..."
                  variant="outlined"
                  value={props.values.message}
                />
                <Button variant="contained" color="primary" type="submit">
                  Send Message
                </Button>
              </FormGroup>
            </form>
          </div>
        )}
      </Formik>
    </Grid>
  );
};
