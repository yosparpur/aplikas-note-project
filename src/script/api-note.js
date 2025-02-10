import Swal from 'sweetalert2';
import './Noteform.js';
import { notesData } from "./notes.js";

const baseUrl = 'https://notes-api.dicoding.dev/v2';

function api() {
    async function loadNotesFromApi() {
        Swal.fire({
            title: "Memuat catatan...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch(`${baseUrl}/notes`);
            const responseJson = await response.json();
            
            Swal.close();

            if (responseJson.error) {
                await Swal.fire(responseJson.message, "", "error");
                renderNotes(notesData);
            } else {
                const combinedNotes = [...notesData, ...responseJson.data];
                renderNotes(combinedNotes);
            }
        } catch (error) {
            Swal.close();
            await Swal.fire("Terjadi kesalahan saat memuat data.", "", "error");
            renderNotes(notesData);
        }
    }

    async function saveNoteToApi(note) {
        Swal.fire({
            title: "Menyimpan catatan...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await fetch(`${baseUrl}/notes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note),
            });

            Swal.close();
            await Swal.fire("Catatan baru berhasil dibuat!", "", "success");

            loadNotesFromApi();
        } catch (error) {
            Swal.close();
            await Swal.fire("Terjadi kesalahan saat menyimpan catatan.", "", "error");
        }
    }

    async function deleteNoteFromApi(noteId) {
        Swal.fire({
            title: "Menghapus catatan...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await fetch(`${baseUrl}/notes/${noteId}`, { method: 'DELETE' });
            Swal.close();
            await Swal.fire("Catatan berhasil dihapus!", "", "success");
            loadNotesFromApi();
        } catch (error) {
            Swal.close();
            await Swal.fire("Terjadi kesalahan saat menghapus catatan.", "", "error");
        }
    }

    async function updateNote(note) {
        Swal.fire({
            title: "Memperbarui catatan...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            await fetch(`${baseUrl}/notes/${note.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(note),
            });

            Swal.close();
            await Swal.fire("Catatan berhasil diperbarui!", "", "success");
            loadNotesFromApi();
        } catch (error) {
            Swal.close();
            await Swal.fire("Terjadi kesalahan saat memperbarui catatan.", "", "error");
        }
    }

    function handleEdit(note) {
        Swal.fire({
            title: "Edit Catatan",
            html: `
                <input id="editTitle" class="swal2-input" placeholder="Judul" value="${note.title}">
                <textarea id="editBody" class="swal2-textarea" placeholder="Isi Catatan">${note.body}</textarea>
            `,
            showCancelButton: true,
            confirmButtonText: "Simpan",
            cancelButtonText: "Batal",
            preConfirm: () => {
                const newTitle = document.getElementById('editTitle').value;
                const newBody = document.getElementById('editBody').value;

                if (!newTitle || !newBody) {
                    Swal.showValidationMessage("Judul dan Isi Catatan harus diisi!");
                    return false;
                }

                return { id: note.id, title: newTitle, body: newBody };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                updateNote(result.value);
            }
        });
    }

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
    
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'button-container';
    
                const deleteButton = document.createElement('button');
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => confirmDelete(note.id);
    
                const editButton = document.createElement('button');
                editButton.textContent = "Edit";
                editButton.onclick = () => handleEdit(note);
    
                buttonContainer.append(editButton, deleteButton);
    
                container.append(titleElement, bodyElement, buttonContainer);
                notesListElement.appendChild(container);
            });
        }
    }

    document.addEventListener('DOMContentLoaded', loadNotesFromApi);
}

export default api;
