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