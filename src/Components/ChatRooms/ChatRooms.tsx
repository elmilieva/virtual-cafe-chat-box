import React, { FC } from "react";
import { IUser } from "./../../model/user.model";
import {
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Room } from "../../model/room.model";

interface Props {
  currentUser: IUser | undefined;
  rooms: Room[];
}

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "70%",
//     },
//   },
//   chatForm: {
//     position: "fixed",
//     bottom: theme.spacing(1),
//     right: theme.spacing(0),
//     width: "100%",
//   },
//   chatMessageField: {
//     width: "100%",
//     //margin: "1rem",
//   },
//   inline: {
//     display: "inline",
//   },
// }));

export const ChatRooms: FC<Props> = ({ currentUser, rooms }) => {
  //const classes = useStyles();

  const filteredRooms: Room[] = [];
    console.log(currentUser);
    console.log(rooms);
  rooms.forEach(function (value) {
    value.participants.forEach(function (val) {
      if (val.username === currentUser?.username) {
        filteredRooms.push(value);
      }
    });
  });
  return (
    <List>
      {filteredRooms.map((r) => (
        <ListItem>
          <ListItemText>{r.roomName}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
