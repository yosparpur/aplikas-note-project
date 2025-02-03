/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script/Noteform.js":
/*!********************************!*\
  !*** ./src/script/Noteform.js ***!
  \********************************/
/***/ (() => {

class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Reset styles */
                * {
                    box-sizing: border-box;
                }

                /* Form styles */
                form {
                    max-width: 400px; 
                    margin: 0 auto; 
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .form-group {
                    margin-bottom: 16px;
                }

                label {
                    display: block;
                    font-weight: bold;
                    margin-bottom: 8px;
                }

                input,
                textarea {
                    width: 100%; 
                    padding: 8px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                }

                textarea {
                    resize: vertical; 
                    min-height: 100px;
                }

                .btn_submitnewnote {
                    background-color: #007bff;
                    color: white;
                    padding: 10px 15px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 20px;
                }

                .btn_submitnewnote:hover {
                    background-color: #0056b3;
                }

                /* Validation message styles */
                .validation-message {
                    color: #e74c3c; 
                    font-size: 12px;
                    margin-top: 4px;
                }
            </style>
            <form id="noteForm" autocomplete="off">
                <div class="form-group row">
                    <label for="noteTitle" class="col-4 col-form-label">Masukkan Judul Catatan</label> 
                    <div class="col-8">
                        <input id="noteTitle" name="noteTitle" type="text" class="form-control" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="noteBody">Isi Catatan</label>
                    <br>
                    <textarea id="noteBody" name="noteBody" required minlength="1"></textarea>
                </div>
                <div class="form-group row">
                    <div class="offset-4 col-8">
                        <button type="submit" class="btn_submitnewnote">Kirim</button>
                    </div>
                </div>
            </form>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('note-form', NoteForm);

/***/ }),

/***/ "./src/script/app-bar.js":
/*!*******************************!*\
  !*** ./src/script/app-bar.js ***!
  \*******************************/
/***/ (() => {

class AppBar extends HTMLElement {
    _shadowRoot = null;
    _style = null;
   
    constructor() {
      super();
   
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._style = document.createElement('style');
    }
   
    _updateStyle() {
      this._style.textContent = `
        :host {
          display: block;
          width: 100%;
         
          color: white;
          
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
        }
   
        div {
          padding: 24px 20px;
        }
   
        .brand-name {
           margin: 0;
            font-size: 1.5em; 
            text-align: center;
        
          font-size: 1.7em;
        }
      `;
    }
   
    _emptyContent() {
      this._shadowRoot.innerHTML = '';
    }
   
    connectedCallback() {
      this.render();
    }
   
    render() {
      this._emptyContent();
      this._updateStyle();
   
      this._shadowRoot.appendChild(this._style);
      this._shadowRoot.innerHTML += `      
        <div>
          <h1 class="brand-name">Aplikasi Note </h1>
        </div>
      `;
    }
  }
   
  customElements.define('app-bar', AppBar);

/***/ }),

/***/ "./src/script/footer.js":
/*!******************************!*\
  !*** ./src/script/footer.js ***!
  \******************************/
/***/ (() => {

class FooterBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  _updateStyle() {
    this._style.textContent = `
      :host {
        display: block;
      }

      div {
        padding: 24px 20px;

        text-align: center;
      }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `      
      <div>
        Aplikasi Note &copy; Yosua Parlindungan Purba  2025
      </div>
    `;
  }
}

customElements.define('footer-bar', FooterBar);


/***/ }),

/***/ "./src/script/notes.js":
/*!*****************************!*\
  !*** ./src/script/notes.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   notesData: () => (/* binding */ notesData)
/* harmony export */ });
const notesData = [
  {
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
  },
  {
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
  },
  {
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
  },
  {
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
  },
  {
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
  },
  {
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
  },
  {
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
  },
  {
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
  },
  {
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
  },
  {
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
  },
  {
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
  },
  {
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
  },
  {
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
  },
  {
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
  },
  {
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
  },
];

console.log(notesData);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _script_app_bar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./script/app-bar.js */ "./src/script/app-bar.js");
/* harmony import */ var _script_app_bar_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_script_app_bar_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _script_footer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./script/footer.js */ "./src/script/footer.js");
/* harmony import */ var _script_footer_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_script_footer_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _script_Noteform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./script/Noteform.js */ "./src/script/Noteform.js");
/* harmony import */ var _script_Noteform_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_script_Noteform_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _script_notes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./script/notes.js */ "./src/script/notes.js");







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
    localStorage.setItem("notesData", JSON.stringify(_script_notes_js__WEBPACK_IMPORTED_MODULE_3__.notesData));

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

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map