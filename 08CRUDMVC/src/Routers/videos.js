const express = require('express');
const router = express.Router();
const videoController = require('../Controllers/videoController');

// Rutas para el CRUD de videos
router.get('/', videoController.listar);
router.get('/:id', videoController.obtener);
router.post('/', videoController.crear);
router.put('/:id', videoController.actualizar);
router.delete('/:id', videoController.eliminar);

module.exports = router;