import io from "socket.io-client";
import { SOCKET_URL } from "../ApiConfig/Endpoints";

// const SOCKET_URL = "http://172.16.1.210:2031"; // vikash local
// // const SOCKET_URL = "https://node-uberbooking.mobiloitte.io"; // vikash local

class WSService {
  initializeSocket = async (id) => {
    try {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
        auth:{
          _id:id
        }
      });

      this.socket.on("connect", (data) => {
      });

      this.socket.on("disconnect", (data) => {
      });

      this.socket.on("error", (data) => {
      });
    } catch (error) {
    }
  };

  emit(event, data = {}) {
    this?.socket?.emit(event, data);
  }

  on(event, cb) {
    this?.socket?.on(event, cb);
  }

  removeListener(listenerName) {
    this?.socket?.removeListener(listenerName);
  }
}

const socketServcies = new WSService();

export default socketServcies;
