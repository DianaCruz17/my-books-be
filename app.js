import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api', (request, response) => {
  const query = 'SELECT * FROM books';

  // Use the .all() method to retrieve all results
  db.all(query, [], (err, rows) => {
    if (err) {
      response.status(400).json({ error: err.message });
      return;
    }
    response.json({
      message: 'success',
      data: rows,
    });
  });
});

app.get('/api/:id', (request, response) => {
  const getId = request.params.id;
  const query = 'SELECT * FROM books WHERE id = (?)';
  db.all(query, [getId], function (err, row) {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }
    response.status(200).json({
      message: 'success',
      data: row,
    });
  });
});

app.post('/api', (request, response) => {
  const { title, author, rating } = request.body;
  const query = 'INSERT INTO books (title,author, rating) VALUES (?,?,?)';

  db.run(query, [title, author, rating], function (err) {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }
    response.status(201).json({
      message: 'success',
    });
  });
});

app.delete('/api/:id', (request, response) => {
  const removeId = request.params.id;
  const query = 'DELETE FROM books  WHERE id = (?)';

  db.run(query, [removeId], function (err) {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }
    response.status(200).json({
      message: 'success',
    });
  });
});

app.put('/api/:id', (request, response) => {
  const idToModify = request.params.id;
  const { title, author, rating } = request.body;
  const query =
    'UPDATE books SET title = (?), author = (?), rating = (?) WHERE id=(?)';

  db.run(query, [title, author, rating, idToModify], function (err) {
    if (err) {
      response.status(500).json({ error: err.message });
      return;
    }
    response.status(200).json({
      messenge: 'success',
    });
  });
});

app.listen(3000, () => console.log('serving on port 3000'));
