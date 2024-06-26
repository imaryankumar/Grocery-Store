import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();
const server = express();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("Hello", (message) => {
      console.log("New Message is", message);
    });
    // socket.on("message1", (data) => {
    //   console.log("Recieved from API ::", data);
    //   io.emit("message2", data);
    // });
  });

  server.all("*", (req, res) => {
    return handler(req, res);
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
