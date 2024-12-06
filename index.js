const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(bodyParser.json());
// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'task'
});
// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});
//Routes
app.get('/api/task', (req, res) => {
  db.query('SELECT * FROM task_available', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});
//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/api/tasks/insert', (req, res) => {
    const {Title, created_at } = req.body;
    db.query('INSERT INTO task_available (id,Title,Complete,created_at,updated_at) VALUES (?,?,?,?, ?)', [id,Title,Complete,created_at,updated_at], (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(400).send('Error creating user');
        return;
      }
      res.status(201).send('User created successfully');
    });
  });
  

  app.put('/api/tasks/update/:id', (req, res) => {
    const {Title, created_at } = req.body;
    const userId = req.params.id;
    db.query('UPDATE complete SET Title = ?, created_at = ? WHERE id = ?', [Title, created_at, userId], (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(400).send('Error updating user');
        return;
      }
      res.send('User updated successfully');
    });
  });
  

  app.delete('/api/tasks/delete/:id', (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM task_available  WHERE id = ?', [userId], (err, result) => {
      if (err) {
        console.error('Error executing query: ' + err.stack);
        res.status(400).send('Error deleting user');
        return;
      }
      res.send('User deleted successfully');
    });
  });