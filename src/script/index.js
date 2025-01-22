import './app-bar.js';
import './footer.js';
 
// Fungsi untuk memuat data dari localStorage
function loadNotesFromLocalStorage() {
  const storedNotes = localStorage.getItem('notesData');
  return storedNotes ? JSON.parse(storedNotes) : []; // Kembalikan array kosong jika tidak ada data
}
 
// Fungsi untuk menyimpan catatan baru ke localStorage
function saveNoteToLocalStorage(note) {
  const storedNotes = localStorage.getItem('notesData'); // Ambil data catatan yang sudah ada
  const notes = storedNotes ? JSON.parse(storedNotes) : []; // Jika tidak ada catatan, buat array kosong
  notes.push(note); // Tambahkan catatan baru ke array
  localStorage.setItem('notesData', JSON.stringify(notes)); // Simpan kembali ke localStorage
}
 
// Fungsi untuk menghapus catatan dari localStorage
function deleteNoteFromLocalStorage(noteId) {
  const storedNotes = localStorage.getItem('notesData'); // Ambil data catatan yang sudah ada
  const notes = storedNotes ? JSON.parse(storedNotes) : [];
  const updatedNotes = notes.filter(note => note.id !== noteId); // Hapus catatan berdasarkan id
  localStorage.setItem('notesData', JSON.stringify(updatedNotes)); // Simpan perubahan ke localStorage
  renderNotes(updatedNotes); // Render ulang catatan setelah penghapusan
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
    // Jika ada catatan, tampilkan masing-masing
    notes.forEach((note) => {
      const container = document.createElement('div');
      container.className = 'note-item';
 
      const titleElement = document.createElement('h3');
      titleElement.textContent = note.title;
 
      const bodyElement = document.createElement('p');
      bodyElement.textContent = note.body;
 
      // Tombol Delete
      const deleteButton = document.createElement('button');
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteNoteFromLocalStorage(note.id); // Fungsi untuk delete catatan
 
      container.append(titleElement, bodyElement, deleteButton);
      notesListElement.appendChild(container);
    });
  }
}
 
// Fungsi untuk mengedit catatan
function editNote(note) {
  // Isi form dengan data catatan yang dipilih
  document.getElementById('noteTitle').value = note.title;
  document.getElementById('noteBody').value = note.body;
 
  // Ganti tombol kirim menjadi tombol update
  const submitButton = document.querySelector('button[name="submit"]');
  submitButton.textContent = "Update";
  submitButton.onclick = () => updateNote(note.id); // Panggil updateNote dengan id catatan
}
 
// Fungsi untuk memperbarui catatan
function updateNote(noteId) {
  const noteTitle = document.getElementById('noteTitle').value;
  const noteBody = document.getElementById('noteBody').value;
 
  if (!noteTitle || !noteBody) {
    alert("Judul dan Isi Catatan harus diisi!");
    return;
  }
 
  const updatedNote = {
    id: noteId,
    title: noteTitle,
    body: noteBody,
    createdAt: new Date().toISOString(),
  };
 
  const storedNotes = localStorage.getItem('notesData');
  const notes = storedNotes ? JSON.parse(storedNotes) : [];
  const updatedNotes = notes.map(note =>
    note.id === noteId ? updatedNote : note // Ganti catatan yang diupdate
  );
 
  localStorage.setItem('notesData', JSON.stringify(updatedNotes)); // Simpan catatan yang sudah diperbarui
  renderNotes(updatedNotes); // Render ulang daftar catatan
  document.getElementById('noteForm').reset(); // Reset form setelah update
  const submitButton = document.querySelector('button[name="submit"]');
  submitButton.textContent = "Kirim"; // Kembalikan tombol ke teks 'Kirim'
}
 
// Event listener untuk menangani pengiriman formulir
document.addEventListener('DOMContentLoaded', () => {
  const noteForm = document.getElementById('noteForm'); // Ambil elemen formulir

 

  const notes = loadNotesFromLocalStorage(); // Muat catatan dari localStorage
  renderNotes(notes); // Tampilkan catatan yang sudah ada di halaman


 
  // Event listener saat formulir disubmit
  noteForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah halaman refresh otomatis
 
    const noteTitle = document.getElementById('noteTitle').value; // Ambil nilai dari input judul
    const noteBody = document.getElementById('noteBody').value; // Ambil nilai dari textarea isi catatan
 
    // Cek apakah input judul dan isi catatan kosong
    if (!noteTitle || !noteBody) {
      alert("Judul dan Isi Catatan harus diisi!");
      return;
    }
 
    // Buat objek catatan baru
    const newNote = {
      id: `note-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`, // ID unik untuk catatan
      title: noteTitle,
      body: noteBody,
      createdAt: new Date().toISOString(), // Timestamp pembuatan catatan
    };
 
    // Simpan catatan baru ke localStorage
    saveNoteToLocalStorage(newNote);
 
    // Reset formulir setelah pengiriman
    noteForm.reset();
 
    // Notifikasi catatan berhasil disimpan
    alert('Catatan berhasil disimpan!');
 
    // Muat dan tampilkan ulang daftar catatan
    renderNotes(loadNotesFromLocalStorage());
  });
});