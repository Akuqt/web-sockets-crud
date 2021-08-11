const socket = io();

const saveNote = (title, description) => {
  socket.emit("client:newNote", {
    title,
    description,
  });
};

const updateNote = (title, description, id) => {
  socket.emit("client:updateNote", { title, description, id });
};

const deleteNote = (id) => {
  socket.emit("client:deleteNote", { id });
};

const getNote = (id) => {
  socket.emit("client:getNote", { id });
};

socket.on("server:newNote", (note) => {
  appendNote(note);
});

socket.on("server:loadNotes", (notes) => {
  renderNotes(notes);
});

socket.on("server:selectedNote", (note) => {
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");

  title.value = note.title;
  description.value = note.description;
  savedId = note.id;
});
