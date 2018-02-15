var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var mongoose = require('mongoose');
var Tareas = mongoose.model('Tareas');

//GET - LISTAR TAREAS
router.get('/tareas',function(req,res,next){
	Tareas.find(function(err,tareas){
		if(err) { return next(err) }
		res.json(tareas);
	});
})

//POST - AGREGAR TAREA
router.post('/tarea', function(req, res, next){
	var tarea = new Tareas(req.body);
	tarea.save(function(err,tareas){
		if(err){ return next(err) }
		res.json(tarea);
	});
});

//PUT - ACTUALIZAR TAREA
router.put('/tarea/:id',function(req,res,next){
	Tareas.findById(req.params.id,function(err,tarea){
		if(err){ return next(err) }
		tarea.nombre = req.body.nombre;
		tarea.prioridad = req.body.prioridad;

		tarea.save(function(err){
			if(err) { res.send(err) }
			res.json(tarea);
		});
	});
});

//DELETE - BORRAR TAREA
router.delete('/tarea/:id',function(req,res,next){
	Tareas.findByIdAndRemove(req.params.id,function(err){
		if(err) { res.send(err) }
		res.json({message: 'La tarea se ha eliminado'});
	});
});

module.exports = router;
