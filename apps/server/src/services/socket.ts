import { Server } from "socket.io";
import Redis from "ioredis";
import dotenv from "dotenv";
import prismaClient from "./prisma";
import { produceMessage } from "./kafka";
import path from "path";
dotenv.config({ path: path.resolve("./.env") });

const publisher = new Redis();
//   {
//   host: "localhost",
//   port: 6379,
//   username: "default",
//   password: process.env.REDIS_PASSWORD || "",
// }
const subscriber = new Redis();

class SocketService {
  private _io: Server;
  constructor() {
    console.log("SocketService initialized");
    this._io = new Server({
      cors: { allowedHeaders: ["*"], origin: "*" },
    });
    subscriber.subscribe("MESSAGES");
  }

  get io(): Server {
    return this._io;
  }

  /**
   * initListeners
   */
  public initListeners() {
    const io = this._io;
    io.on("connect", (socket) => {
      console.log("A user connected ", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("message", message);
        await publisher.publish("MESSAGES", JSON.stringify({ message }));
      });
    });
    subscriber.on("message", async (channel, message) => {
      if (channel === "MESSAGES") {
        console.log("message", message);
        io.emit("message", JSON.parse(message));
        await produceMessage(message);
      }
    });
  }
}
export default SocketService;
