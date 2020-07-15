import React, { FC } from "react";
import { IUser } from "./../../model/user.model";
import { List, ListItem, Button, Typography } from "@material-ui/core";
import { Room } from "../../model/room.model";
import { RoomCallback } from "../../shared/shared-types";

// properties from parent
interface Props {
  currentUser: IUser | undefined;
  setActiveRoom: RoomCallback;
  rooms: Room[];
}

// ChatRooms component with properties from parent
export const ChatRooms: FC<Props> = ({ currentUser, rooms, setActiveRoom }) => {
  // filter rooms inorder to show rooms that the current user is a participant
  const filteredRooms: Room[] = [];
  rooms.forEach(function (value) {
    value.participants.forEach(function (val) {
      if (val.username === currentUser?.username) {
        filteredRooms.push(value);
      }
    });
  });
  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4">Chat Rooms</Typography>
      <List style={{ textAlign: "center" }}>
        {filteredRooms.map((r) => (
          <ListItem key={r._id} style={{ textAlign: "center" }}>
            <Button
              style={{ margin: "0 auto" }}
              variant="contained"
              onClick={() => {
                setActiveRoom(r);
              }}
            >
              {r.roomName}
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
