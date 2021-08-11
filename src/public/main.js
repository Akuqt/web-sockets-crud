const noteForm = document.querySelector("#noteForm");
const title = document.querySelector("#title");
const description = document.querySelector("#description");

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (savedId) {
    updateNote(title.value, description.value, savedId);
    savedId = "";
  } else {
    saveNote(title.value, description.value);
  }
  title.value = "";
  description.value = "";
  title.focus();
});
