// import booksController
const booksController = require('../controllers/booksController');
// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello BookLibrary");
});

// Membuat routing untuk buku
router.get('/books', booksController.index);
router.post('/books', booksController.store);
router.put('/books/:id', booksController.update);
router.delete('/books/:id', booksController.destroy);
router.get('/books/:id', booksController.show);

// export router
module.exports = router;
