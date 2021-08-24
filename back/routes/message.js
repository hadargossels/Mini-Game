var express = require('express');
var router = express.Router();
var Message = require('../controllers/message')

/* RESTFUL API */ 

router.get('/', Message.findAll);

router.get('/:id', Message.findById);

router.post('/', Message.create);

router.put('/:id', Message.update);

// router.patch('/:id', Message.patchUpdate);

router.delete('/:id', Message.delete);


module.exports = router;
