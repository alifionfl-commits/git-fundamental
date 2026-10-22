const express = require('express');
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: 'Buku Pemrograman Web', author: 'Budi' },
  { id: 2, title: 'Belajar Git & GitHub', author: 'Siti' }
];

// GET: Ambil semua buku
app.get('/api/books', (req, res) => {
  res.json(books);
});

// POST: Tambah buku baru
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT: Update buku berdasarkan ID
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index !== -1) {
    books[index] = { id, title: req.body.title, author: req.body.author };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: 'Buku tidak ditemukan' });
  }
});

// DELETE: Hapus buku berdasarkan ID
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: 'Buku berhasil dihapus' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// catatan: fitur crud buku selesai
