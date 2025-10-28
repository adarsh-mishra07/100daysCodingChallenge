const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

// Step 1: Load notes from local storage on page load
window.onload = function () {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    savedNotes.forEach(note => addNoteToDOM(note));
};

// Step 2: Add new note
addNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (noteText === "") {
        alert("Please write something!");
        return;
    }

    addNoteToDOM(noteText);
    saveNoteToLocalStorage(noteText);
    noteInput.value = "";
});

// Step 3: Function to display note in UI
function addNoteToDOM(noteText) {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";
    noteDiv.innerHTML = `
    <p>${noteText}</p>
    <button class="deleteBtn">X</button>
  `;

    notesList.appendChild(noteDiv);

    // Delete button functionality
    noteDiv.querySelector(".deleteBtn").addEventListener("click", () => {
        noteDiv.remove();
        deleteNoteFromLocalStorage(noteText);
    });
}

// Step 4: Save note to local storage
function saveNoteToLocalStorage(noteText) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Step 5: Delete note from local storage
function deleteNoteFromLocalStorage(noteText) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note !== noteText);
    localStorage.setItem("notes", JSON.stringify(notes));
}
