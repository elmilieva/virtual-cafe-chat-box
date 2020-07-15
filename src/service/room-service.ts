import { RoomRepository } from "../dao/repository";
import { IdType } from "../shared/shared-types";
import { Room } from "../model/room.model";

class RoomService {
  private repo = new RoomRepository();

  async getAllRooms() {
    const resp = await fetch("http://localhost:9000/api/rooms");
    const room = await resp.json();
    return room;
  }

  async getRoomById(roomId: IdType) {
    const resp = await fetch(`http://localhost:9000/api/rooms/${roomId}`);
    const room = await resp.json();
    return room;
  }

  async createNewRoom(room: Room) {
    const resp = await fetch("http://localhost:9000/api/rooms", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(room),
    });
    const created = await resp.json();
    return created;
  }
}

export default new RoomService();
