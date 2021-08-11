import express from "express";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import { v4 as uuid } from "uuid";

const app = express();

app.use(express.static(__dirname + "/public"));

const httpServer = http.createServer(app);

const io = new WebSocketServer(httpServer);

let notes: any[] = [];

io.on("connection", (socket) => {
  socket.emit("server:loadNotes", notes);

  socket.on("client:newNote", (newNote) => {
    const note = {
      ...newNote,
      id: uuid(),
    };
    notes.push(note);
    io.emit("server:newNote", note);
  });

  socket.on("client:deleteNote", (data) => {
    notes = notes.filter((n) => n.id !== data.id);
    io.emit("server:loadNotes", notes);
  });

  socket.on("client:getNote", (data) => {
    const note = notes.find((u) => u.id === data.id);
    socket.emit("server:selectedNote", note);
  });

  socket.on("client:updateNote", (data) => {
    notes = notes.map((n) => {
      if (n.id === data.id) {
        n.title = data.title;
        n.description = data.description;
      }
      return n;
    });

    io.emit("server:loadNotes", notes);
  });
});

httpServer.listen(3000, () => console.log("Server on port 3000"));
