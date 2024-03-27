// import database
const db = require("../config/database");

// membuat class Book
class Book {
  // Mengambil semua buku
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM books";
      db.query(sql, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  // Menambahkan buku baru
  static create(data) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO books SET ?";
      db.query(sql, data, (err, results) => {
        if (err) {
          return reject(err);
        }
        // Mengambil buku baru berdasarkan ID
        const newBookId = results.insertId;
        this.find(newBookId).then(resolve).catch(reject);
      });
    });
  }

  // Menampilkan detail buku berdasarkan ID
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM books WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  // Memperbarui data buku
  static update(id, data) {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE books SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) reject(err);
        this.find(id).then(resolve).catch(reject);
      });
    });
  }

  // Menghapus buku
  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM books WHERE id = ?";
      db.query(sql, [id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

}

// export class Book
module.exports = Book;
