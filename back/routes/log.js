var express = require('express');
var router = express.Router();
var Log = require('../controllers/log')

/* RESTFUL API */ 

router.get('/', Log.findAll);

router.get('/:id', Log.findById);

router.post('/', Log.create);

router.put('/:id', Log.update);

// router.patch('/:id', Log.patchUpdate);

router.delete('/:id', Log.delete);


module.exports = router;
