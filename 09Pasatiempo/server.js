const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const CREAR_TABLA = `
CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo TEXT NOT NULL,
  canal TEXT NOT NULL,
  categoria TEXT NOT NULL,
  puntuacion INT NOT NULL,
  resena TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

db.query(CREAR_TABLA, (err) => {
  if (err) {
    console.error('Error creando la tabla de videos:', err.message);
    process.exit(1);
  }
  console.log('Conexión MySQL establecida y tabla videos verificada.');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Index.html'));
});

app.get('/api/videos', (req, res) => {
  const sql = 'SELECT * FROM videos ORDER BY id DESC';
  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer los videos.' });
    }
    res.json(rows);
  });
});

app.post('/api/videos', (req, res) => {
  const { titulo, canal, categoria, puntuacion, resena } = req.body;

  if (!titulo || !canal || !categoria || !puntuacion || !resena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const sql = 'INSERT INTO videos (titulo, canal, categoria, puntuacion, resena) VALUES (?, ?, ?, ?, ?)';
  const params = [titulo, canal, categoria, parseInt(puntuacion, 10), resena];

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al guardar el video.' });
    }
    res.status(201).json({
      id: result.insertId,
      titulo,
      canal,
      categoria,
      puntuacion: parseInt(puntuacion, 10),
      resena
    });
  });
});

app.put('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  const { titulo, canal, categoria, puntuacion, resena } = req.body;

  if (!titulo || !canal || !categoria || !puntuacion || !resena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const sql = 'UPDATE videos SET titulo = ?, canal = ?, categoria = ?, puntuacion = ?, resena = ? WHERE id = ?';
  const params = [titulo, canal, categoria, parseInt(puntuacion, 10), resena, id];

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el video.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Video no encontrado.' });
    }
    res.json({ id: parseInt(id, 10), titulo, canal, categoria, puntuacion: parseInt(puntuacion, 10), resena });
  });
});

app.delete('/api/videos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM videos WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el video.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Video no encontrado.' });
    }
    res.status(204).send();
  });
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
