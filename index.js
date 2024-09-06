const form = document.getElementById('form');
const notesList = document.getElementById('notes');

document.addEventListener('DOMContentLoaded', loadNotes);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('note-title').value.trim();
    const description = document.getElementById('note-description').value.trim();
    const date = document.getElementById('note-date').value;

    if (title === '' || description === '' || date === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    const note = {
        title,
        description,
        date
    };

    addNoteToList(note);
    saveNoteToLocal(note);

    form.reset();
});

function addNoteToList(note) {
    const noteElement = document.createElement('li');
    
    noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.description}</p>
        <span>Fecha de inspección: ${note.date}</span>
        <button class="delete-btn">Eliminar</button>
    `;

    const deleteBtn = noteElement.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        notesList.removeChild(noteElement);
        deleteNoteFromLocal(note);
    });

    notesList.appendChild(noteElement);
}
function saveNoteToLocal(note) {
    let notes = getNotesFromLocal();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotesFromLocal() {
    return localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
}

function loadNotes() {
    const notes = getNotesFromLocal();
    notes.forEach(note => addNoteToList(note));
}

function deleteNoteFromLocal(noteToDelete) {
    let notes = getNotesFromLocal();
    notes = notes.filter(note => note.title !== noteToDelete.title || note.date !== noteToDelete.date);
    localStorage.setItem('notes', JSON.stringify(notes));
}
