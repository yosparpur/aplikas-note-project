import './Noteform.js';
import { notesData } from "./notes.js";


function local() {
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
        renderNotes(updatedNotes);
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
        if (!notesListElement) return; 
    
        notesListElement.innerHTML = ''; 
    
        if (notes.length === 0) {
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
    
                // Menambahkan elemen createdAt
                const createdAtElement = document.createElement('small');
                createdAtElement.textContent = `Dibuat pada: ${new Date(note.createdAt).toLocaleString()}`;
    
                const deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deleteNoteFromLocalStorage(note.id);
    
                const editButton = document.createElement('button');
                editButton.textContent = "Edit";
                editButton.onclick = () => handleEdit(note);
    
                container.append(titleElement, bodyElement, createdAtElement, editButton, deleteButton);
                notesListElement.appendChild(container);
            });
        }
    }
    
    // Fungsi menangani edit catatan
    function handleEdit(note) {
        const noteForm = document.querySelector('note-form').shadowRoot.querySelector('#noteForm');
        noteForm.querySelector('#noteTitle').value = note.title;
        noteForm.querySelector('#noteBody').value = note.body;
    
        const submitButton = noteForm.querySelector('.btn_submitnewnote');
        submitButton.textContent = "Update";
    
        // Hapus event listener sebelumnya untuk mencegah duplikasi
        submitButton.replaceWith(submitButton.cloneNode(true));
        const newSubmitButton = noteForm.querySelector('.btn_submitnewnote');
    
        newSubmitButton.onclick = (event) => {
            event.preventDefault();
            updateNote(
                note.id,
                noteForm.querySelector('#noteTitle').value,
                noteForm.querySelector('#noteBody').value
            );
            noteForm.reset();
            newSubmitButton.textContent = "Kirim";
        };
    }
    
    // Event listener utama
    document.addEventListener('DOMContentLoaded', () => {
        // Pastikan dummy data hanya disimpan jika belum ada data di localStorage
        if (!localStorage.getItem("notesData")) {
            localStorage.setItem("notesData", JSON.stringify(notesData));
        }
    
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
