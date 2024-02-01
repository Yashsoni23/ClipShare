const { Server } = require("socket.io");
const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer(handle);
  const io = new Server(server);

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

  server.listen(3000, () => {
    console.log("listening on *:3000");
  });
});
