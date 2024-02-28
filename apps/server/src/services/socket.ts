import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  constructor() {
    console.log("SocketService initialized");
    this._io = new Server({
      cors: { allowedHeaders: ["*"], origin: "*" },
    });
  }

  get io(): Server {
    return this._io;
  }

  /**
   * initListeners
   */
  public initListeners() {
    const io = this._io;
    io.on("connection", (socket) => {
      console.log("A user connected ", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("message", message);
        // io.emit("event:message", message);
      });
    });
  }
}
export default SocketService;
