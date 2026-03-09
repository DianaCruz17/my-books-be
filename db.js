import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('./my_books.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Run initial setup (e.g., create tables)
    db.serialize(() => {
      db.run(
        'CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, rating INTEGER)',
      );
    });
  }
});

export default db;
