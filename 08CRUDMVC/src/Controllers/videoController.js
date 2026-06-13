const db = require('../DB/database'); // Tu archivo de conexión a MySQL

const videoController = {
    // 1. LISTAR VIDEOS
    listar: async (req, res, next) => {
        try {
            const [rows] = await db.query('SELECT * FROM videos');
            res.json({ status: 'success', data: rows });
        } catch (error) {
            next(error);
        }
    },

    // 2. OBTENER UN VIDEO POR ID
    obtener: async (req, res, next) => {
        try {
            const [rows] = await db.query('SELECT * FROM videos WHERE id = ?', [req.params.id]);
            if (rows.length === 0) {
                return res.status(404).json({ status: 'error', message: 'Video no encontrado' });
            }
            res.json({ status: 'success', data: rows[0] });
        } catch (error) {
            next(error);
        }
    },

    // 3. CREAR VIDEO (Con tus 4 validaciones mínimas)
    crear: async (req, res, next) => {
        try {
            const { titulo, canal, url_video, duracion_minutos, categoria } = req.body;

            // Validación 1: Campos obligatorios
            if (!titulo || !canal || !url_video || !duracion_minutos) {
                return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios.' });
            }
            // Validación 2: Que sea un link real de YouTube
            if (!url_video.includes('youtube.com') && !url_video.includes('youtu.be')) {
                return res.status(400).json({ status: 'error', message: 'La URL debe ser de YouTube.' });
            }
            // Validación 3: Que la duración sea un número válido
            if (isNaN(duracion_minutos) || duracion_minutos <= 0) {
                return res.status(400).json({ status: 'error', message: 'La duración debe ser mayor a 0.' });
            }

            const [result] = await db.query(
                'INSERT INTO videos (titulo, canal, url_video, duracion_minutos, categoria) VALUES (?, ?, ?, ?, ?)',
                [titulo, canal, url_video, duracion_minutos, categoria || 'General']
            );

            res.status(201).json({ status: 'success', message: 'Video guardado', id: result.insertId });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ status: 'error', message: 'Este video ya está registrado.' });
            }
            next(error);
        }
    },

    // 4. ACTUALIZAR VIDEO
    actualizar: async (req, res, next) => {
        try {
            const { titulo, canal, url_video, duracion_minutos, categoria } = req.body;
            const id = req.params.id;

            // Validación rápida de duración si la intentan cambiar
            if (duracion_minutos && (isNaN(duracion_minutos) || duracion_minutos <= 0)) {
                return res.status(400).json({ status: 'error', message: 'Duración inválida.' });
            }

            const [result] = await db.query(
                'UPDATE videos SET titulo = ?, canal = ?, url_video = ?, duracion_minutos = ?, categoria = ? WHERE id = ?',
                [titulo, canal, url_video, duracion_minutos, categoria, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ status: 'error', message: 'Video no encontrado para actualizar' });
            }

            res.json({ status: 'success', message: 'Video actualizado correctamente' });
        } catch (error) {
            next(error);
        }
    },

    // 5. ELIMINAR VIDEO
    eliminar: async (req, res, next) => {
        try {
            const [result] = await db.query('DELETE FROM videos WHERE id = ?', [req.params.id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ status: 'error', message: 'El video no existe' });
            }
            res.json({ status: 'success', message: 'Video eliminado' });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = videoController;