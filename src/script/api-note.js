function api () {
    const baseUrl = 'https://notes-api.dicoding.dev/v2/notes';

    const loadNotesFromApi = () => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            console.log('Response Status:', this.status); // Log status respons
            console.log('Data Received:', responseJson); // Log data yang diterima
            if (responseJson.error) {
                showResponseMessage(responseJson.message);
            } else {
                renderNotes(responseJson.notes);
            }
        };

        xhr.onerror = function () {
            console.error('Error:', this.statusText); // Log kesalahan
            showResponseMessage('Check your internet connection');
        };

        xhr.open('GET', baseUrl);
        xhr.send();
    };

    const insertNote = (note) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            console.log('Response Status:', this.status); // Log status respons
            console.log('Data Received:', responseJson); // Log data yang diterima
            showResponseMessage(responseJson.message);
            loadNotesFromApi(); // Muat ulang catatan setelah menyimpan
        };

        xhr.onerror = function () {
            console.error('Error:', this.statusText); // Log kesalahan
            showResponseMessage('Check your internet connection');
        };

        xhr.open('POST', baseUrl);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Auth-Token', '12345');
        xhr.send(JSON.stringify(note));
    };

    const renderNotes = (notes) => {
        const notesListElement = document.getElementById('notesList');
        if (!notesListElement) return;

        notesListElement.innerHTML = '';

        if (!notes || notes.length === 0) {
            const noNotesMessage = document.createElement('p');
            noNotesMessage.textContent = "Tidak ada catatan yang tersedia.";
            notesListElement.appendChild(noNotesMessage);
            return;
        }

        notes.forEach((note) => {
            const container = document.createElement('div');
            container.className = 'note-item';
            container.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.body}</p>
                <button onclick="removeNote(${note.id})">Hapus</button>
                <button onclick="editNote(${note.id}, '${note.title}', '${note.body}')">Edit</button>
            `;
            notesListElement.appendChild(container);
        });
    };

    const removeNote = (noteId) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            loadNotesFromApi(); // Muat ulang catatan setelah penghapusan
        };

        xhr.onerror = function () {
            console.error('Error:', this.statusText); // Log kesalahan
            showResponseMessage('Check your internet connection');
        };

        xhr.open('DELETE', `${baseUrl}/${noteId}`);
        xhr.setRequestHeader('X-Auth-Token', '12345');
        xhr.send();
    };

    const editNote = (noteId, noteTitle, noteBody) => {
        const updatedNote = {
            title: noteTitle,
            body: noteBody
        };

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            loadNotesFromApi(); // Muat ulang catatan setelah pengeditan
        };

        xhr.onerror = function () {
            console.error('Error:', this.statusText); // Log kesalahan
            showResponseMessage('Check your internet connection');
        };

        xhr.open('PUT', `${baseUrl}/${noteId}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-Auth-Token', '12345');
        xhr.send(JSON.stringify(updatedNote));
    };

    // Panggil loadNotesFromApi saat halaman dimuat
    document.addEventListener('DOMContentLoaded', loadNotesFromApi);
}
export default api;
