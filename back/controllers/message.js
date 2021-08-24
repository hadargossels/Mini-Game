let Message = require("../models/Message")

exports.findAll = function (req,res) {
    Message.findAll(function(err, messages){
        // console.log('In Messages controller , findAll')
        if(err)
            res.send(err)
            else {
                res.setHeader('Content-Range', `${messages.length}`)
                res.send(messages)
            }

    })
}

exports.create = function(req, res){

    let MessageData = req.body

    Message.create({...MessageData},function (err) {
        // console.log('In Messages controller , findAll')
        if (err)
            res.send(err)

        else
        res.json({error:false, message: 'Message Added successfully'})

    })
}



exports.findById = function(req, res){
    Message.findById(req.params.id, function(err, message){
        if(err)
            res.send(err)
        else
            res.json(message)
    })
}

exports.update = function (req, res) {
    let MessageData = req.body

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: 'Please provide all required field'
        });
    } else {
        Message.update(req.params.id, new Message(MessageData), function (err, MessageData) {
            if (err)
                res.send(err);
            else
            res.redirect(`/messages/${req.params.id}/edit`)
        });
    }
};

exports.delete = function (req, res) {
    Message.delete(req.params.id, function (err, message) {
        if (err)
            res.send({
                error: true,
                message: err.message
            });
        else

        res.json({
            error: false,
            message: 'Message successfully deleted'
        });
    });
};
