// pages/api/socket.js
import { Server } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: any, res: any) {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server;
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("clipboardData", (data) => {
        console.log("Clipboard Data:", data);
        io.emit("clipboardData", data); // Broadcast clipboard data to all connected clients
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
