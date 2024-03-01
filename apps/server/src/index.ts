import http from "http";
import SocketService from "./services/socket";
import { consumeMessage } from "./services/kafka";

async function init() {
  await consumeMessage();
  const httpServer = http.createServer();
  const socketService = new SocketService();
  const PORT = process.env.PORT || 8000;
  socketService.io.attach(httpServer);

  socketService.initListeners();

  httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
init();
