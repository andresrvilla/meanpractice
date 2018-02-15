var mongoose = require('mongoose');

var TareasSchema = new mongoose.Schema({
	nombre: String,
	prioridad: Number
});

module.exports = mongoose.model('Tareas', TareasSchema);