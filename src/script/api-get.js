function main() {

  const getNote = () => {
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
   
    xhr.open('GET', 'https://notes-api.dicoding.dev/v2/notes');
    xhr.send();
  };

  const insertNote = (note) => {
    const xhr = new XMLHttpRequest();
 
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getNote();
    };
 
    xhr.onerror = function () {
      showResponseMessage();
    };
 
    xhr.open('POST', 'https://notes-api.dicoding.dev/v2/notes');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('X-Auth-Token', '12345');
    xhr.send(JSON.stringify(note));
  };

  const updateNote = (note) => {
    const xhr = new XMLHttpRequest();
 
    xhr.onload = function () {
      const responseJson = JSON.parse(this.responseText);
      showResponseMessage(responseJson.message);
      getNote();
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
      getNote();
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
              <p>${note.body}</p>
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

  document.addEventListener('DOMContentLoaded', () => {

    const inputNoteId = document.querySelector('#inputNoteId');
    const inputNoteTitle = document.querySelector('#inputNoteTitle');
    const inputNoteBody = document.querySelector('#inputNoteBody');
    const archived = document.querySelector('#boeleanarchived');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');

    buttonSave.addEventListener('click', function () {
      const note = {
        id: Number.parseInt(inputNoteId.value),
        title: inputNoteTitle.value,
        body: inputNoteBody.value,
        archived: archived.checked // Mengambil nilai boolean dari checkbox
      };
      insertNote(note);
    });

    buttonUpdate.addEventListener('click', function () {
      const note = {
          id: Number.parseInt(inputNoteId.value),
          title: inputNoteTitle.value,
          body: inputNoteBody.value,
          archived: archived.checked // Mengambil nilai boolean dari checkbox
      };

      updateNote(note);
    });
    getNote();
  });
}

export default main;