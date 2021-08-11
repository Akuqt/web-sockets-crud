const notesList = document.querySelector("#notes");

let savedId = "";

const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 mt-3">
    <div class="d-flex justify-content-between w-100">
        <h1 class="h3 card-title">${note.title}</h1>
        <div >
            <button class="btn btn-warning mx-4 update" data-id="${note.id}">Update</button>
            <button class="btn btn-danger delete" data-id="${note.id}">Delete</button>
        </div>
    </div>
    <p>${note.description}</p>
  </div>
  `;

  const deleteBtn = div.querySelector(".delete");
  const updateBtn = div.querySelector(".update");

  deleteBtn.addEventListener("click", () => {
    const id = deleteBtn.dataset.id;
    deleteNote(id);
  });
  updateBtn.addEventListener("click", () => {
    const id = updateBtn.dataset.id;
    getNote(id);
  });

  return div;
};

const appendNote = (note) => {
  notesList.append(noteUI(note));
};

const renderNotes = (notes) => {
  notesList.innerHTML = "";
  notes.forEach((note) => {
    notesList.append(noteUI(note));
  });
};
