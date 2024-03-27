// import Model book
const Book = require('../models/book');

class BooksController {
  async index(req, res) {
    try {
       const books = await Book.all();
 
       if (books && books.length > 0) {
          return res.status(200).json({
             message: "The request succeeded",
             data: books
          });
       } else {
          return res.status(200).json({
             message: "Menampilkan data book",
          });
       }
    } catch (error) {
       console.error("Error fetching books:", error);
       return res.status(500).json({ message: "Internal Server Error" });
    }
 }

 async store(req, res) {
    try {
      const newBook = await Book.create(req.body);
      return res.json({
        message: "Menambahkan data book",
        data: newBook,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  async update(req, res) {
    const { id } = req.params;
    try {
      const foundBook = await Book.find(id);
    
      if (foundBook) {
        const updatedBook = await Book.update(id, req.body);
        return res.status(200).json({
          message: "Mengedit data book",
          data: updatedBook,
        });
      } else {
        return res.status(404).json({
          message: "Resource not found",
        });
      }
    } catch (error) {
      console.error("Error updating book:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      const foundBook = await Book.find(id);
      if (foundBook) {
        await Book.delete(id);
        res.status(200).json({
          message: `Menghapus data book`,
        });
      } else {
        res.status(404).json({
          message: `Book not found`,
        });
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  async show(req, res) {
    const { id } = req.params;
    try {
      const foundBook = await Book.find(id);
      if (foundBook) {
        res.status(200).json({
          message: `Menampilkan detail book`,
          data: foundBook,
        });
      } else {
        res.status(404).json({
          message: `Book not found`,
        });
      }
    } catch (error) {
      console.error("Error fetching book detail:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  
  
}

// membuat object booksController
const object = new BooksController();

// export object booksController
module.exports = object;
