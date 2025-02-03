
import './Noteform.js'
import { notesData } from "./notes.js";
function local(){

// Fungsi untuk memuat data dari localStorage
function loadNotesFromLocalStorage() {
    const storedNotes = localStorage.getItem('notesData');
    return storedNotes ? JSON.parse(storedNotes) : [];
}

// Fungsi untuk menyimpan catatan baru ke localStorage
function saveNoteToLocalStorage(note) {
    const notes = loadNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem('notesData', JSON.stringify(notes));
}

// Fungsi untuk menghapus catatan dari localStorage
function deleteNoteFromLocalStorage(noteId) {
    const notes = loadNotesFromLocalStorage();
    const updatedNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('notesData', JSON.stringify(updatedNotes));
    renderNotes(updatedNotes); // Render ulang setelah penghapusan
}

// Fungsi untuk memperbarui catatan
function updateNote(noteId, noteTitle, noteBody) {
    const notes = loadNotesFromLocalStorage();
    const updatedNotes = notes.map(note =>
        note.id === noteId ? { ...note, title: noteTitle, body: noteBody } : note
    );
    localStorage.setItem('notesData', JSON.stringify(updatedNotes));
    renderNotes(updatedNotes);
}

// Fungsi untuk memperbarui tampilan daftar catatan
function renderNotes(notes) {
    const notesListElement = document.getElementById('notesList');
    if (!notesListElement) return; // Pastikan elemen ada sebelum memanipulasinya

    notesListElement.innerHTML = ''; // Bersihkan elemen sebelumnya

    if (notes.length === 0) {
        // Jika tidak ada catatan, tampilkan pesan
        const noNotesMessage = document.createElement('p');
        noNotesMessage.textContent = "Tidak ada catatan yang tersedia.";
        notesListElement.appendChild(noNotesMessage);
    } else {
        notes.forEach((note) => {
            const container = document.createElement('div');
            container.className = 'note-item';

            const titleElement = document.createElement('h3');
            titleElement.textContent = note.title;

            const bodyElement = document.createElement('p');
            bodyElement.textContent = note.body;

            // Tambahkan elemen untuk createdAt
            const dateElement = document.createElement('small');
            const formattedDate = new Date(note.createdAt).toLocaleString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            dateElement.textContent = `Dibuat pada: ${formattedDate}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteNoteFromLocalStorage(note.id);

            const editButton = document.createElement('button');
            editButton.textContent = "Edit";
            editButton.onclick = () => {
                const noteForm = document.querySelector('note-form').shadowRoot.querySelector('#noteForm');
                noteForm.querySelector('#noteTitle').value = note.title;
                noteForm.querySelector('#noteBody').value = note.body;

                const submitButton = noteForm.querySelector('.btn_submitnewnote');
                submitButton.textContent = "Update";
                submitButton.onclick = (event) => {
                    event.preventDefault();
                    updateNote(note.id,
                        noteForm.querySelector('#noteTitle').value,
                        noteForm.querySelector('#noteBody').value
                    );
                    noteForm.reset();
                    submitButton.textContent = "Kirim";
                };
            };

            container.append(titleElement, dateElement, bodyElement, editButton, deleteButton);
            notesListElement.appendChild(container);
        });
    }
}


// Event listener utama
document.addEventListener('DOMContentLoaded', () => {
    // Dummy data awal (hanya untuk demonstrasi)
    localStorage.setItem("notesData", JSON.stringify(notesData));

    const notes = loadNotesFromLocalStorage();
    renderNotes(notes);

    const noteForm = document.querySelector('note-form').shadowRoot.querySelector('#noteForm');
    noteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const noteTitle = noteForm.querySelector('#noteTitle').value;
        const noteBody = noteForm.querySelector('#noteBody').value;

        if (!noteTitle || !noteBody) {
            alert("Judul dan Isi Catatan harus diisi!");
            return;
        }

        const newNote = {
            id: `note-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`,
            title: noteTitle,
            body: noteBody,
            createdAt: new Date().toISOString(),
        };

        saveNoteToLocalStorage(newNote);
        noteForm.reset();
        renderNotes(loadNotesFromLocalStorage());
        alert('Catatan berhasil disimpan!');
    });
});

}
export default local;