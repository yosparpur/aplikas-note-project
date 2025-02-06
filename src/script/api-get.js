function main() {
    const baseUrl = 'https://notes-api.dicoding.dev/v2';

const getNotes = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const responseJson = JSON.parse(this.responseText);
        if (responseJson.error) {
            showResponseMessage(responseJson.message);
        } else {
            renderAllNotes(responseJson.notes);
        }
    };
    xhr.onerror = function () {
        showResponseMessage();
    };
    xhr.open('GET', `${baseUrl}/notes`);
    xhr.send();
};

const insertNote = (note) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const responseJson = JSON.parse(this.responseText);
        showResponseMessage(responseJson.message);
        getNotes();
    };
    xhr.onerror = function () {
        showResponseMessage();
    };
    xhr.open('POST', `${baseUrl}/add`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');
    xhr.send(JSON.stringify(note));
};

const updateNote = (note) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const responseJson = JSON.parse(this.responseText);
        showResponseMessage(responseJson.message);
        getNotes();
    };
    xhr.onerror = function () {
        showResponseMessage();
    };
    xhr.open('PUT', `${baseUrl}/edit/${note.id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');
    xhr.send(JSON.stringify(note));
};

const removeNote = (noteId) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        const responseJson = JSON.parse(this.responseText);
        showResponseMessage(responseJson.message);
        getNotes();
    };
    xhr.onerror = function () {
        showResponseMessage();
    };
    xhr.open('DELETE', `${baseUrl}/delete/${noteId}`);
    xhr.setRequestHeader('X-Auth-Token', '12345');
    xhr.send();
};

const renderAllNotes = (notes) => {
    const listNoteElement = document.querySelector('#listNote');
    listNoteElement.innerHTML = '';

    notes.forEach(note => {
        listNoteElement.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                <div class="card">
                    <div class="card-body">
                        <h5>(${note.id}) ${note.title}</h5>
                        <p>${note.content}</p>
                        <button type="button" class="btn btn-danger button-delete" id="${note.id}">Hapus</button>
                    </div>
                </div>
            </div>
        `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach(button => {
        button.addEventListener('click', event => {
            const noteId = event.target.id;
            removeNote(noteId);
        });
    });
};

const showResponseMessage = (message = 'Check your internet connection') => {
    alert(message);
};

// Panggil getNotes saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    getNotes();
});
}
export default main ;
