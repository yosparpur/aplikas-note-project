import './Noteform.js';
import { notesData } from "./notes.js";

const baseUrl = 'https://notes-api.dicoding.dev/v2';

function api() {
    // Fungsi untuk memuat data dari API
    function loadNotesFromApi() {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            console.log(responseJson); // Tambahkan log untuk memeriksa respons
            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderNotes(responseJson.data);
            }
        };
        xhr.onerror = function () {
            showResponseMessage('Terjadi kesalahan saat memuat data.');
        };
        xhr.open('GET', `${baseUrl}/notes`);
        xhr.send();
    }
    // Fungsi untuk menyimpan catatan baru ke API
    function saveNoteToApi(note) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            loadNotesFromApi(); // Reload notes after saving
        };
        xhr.onerror = function () {
            showResponseMessage('Terjadi kesalahan saat menyimpan catatan.');
        };
        xhr.open('POST', `${baseUrl}/notes`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(note));
    }

    // Fungsi untuk menghapus catatan dari API
    function deleteNoteFromApi(noteId) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            loadNotesFromApi(); // Reload notes after deletion
        };
        xhr.onerror = function () {
            showResponseMessage('Terjadi kesalahan saat menghapus catatan.');
        };
        xhr.open('DELETE', `${baseUrl}/notes/${noteId}`);
        xhr.send();
    }

    // Fungsi untuk memperbarui catatan
    function updateNote(note) {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            loadNotesFromApi(); // Reload notes after updating
        };
        xhr.onerror = function () {
            showResponseMessage('Terjadi kesalahan saat memperbarui catatan.');
        };
        xhr.open('PUT', `${baseUrl}/notes/${note.id}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(note));
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

                const createdAtElement = document.createElement('small');
                createdAtElement.textContent = `Dibuat pada: ${new Date(note.createdAt).toLocaleString()}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deleteNoteFromApi(note.id);

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
            updateNote({
                id: note.id,
                title: noteForm.querySelector('#noteTitle').value,
                body: noteForm.querySelector('#noteBody').value,
                createdAt: note.createdAt // Pastikan untuk menyertakan createdAt jika diperlukan
            });
            noteForm.reset();
            newSubmitButton.textContent = "Kirim";
        };
    }

    // Fungsi untuk menampilkan pesan respons
    function showResponseMessage(message = 'Check your internet connection') {
        alert(message);
    }

    // Event listener utama
    document.addEventListener('DOMContentLoaded', () => {
        loadNotesFromApi(); // Load notes from API on page load

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
                id: `note-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`, // ID ini mungkin tidak diperlukan jika API mengelola ID
                title: noteTitle,
                body: noteBody,
                createdAt: new Date().toISOString(),
            };

            saveNoteToApi(newNote);
            noteForm.reset();
        });
    });
}

export default api;