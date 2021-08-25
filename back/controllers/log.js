let Log = require("../models/log")

exports.findAll = function (req,res) {
    Log.findAll(function(err, logs){
        // console.log('In Logs controller , findAll')
        if(err)
            return res.send(err)
            else {
                res.setHeader('Content-Range', `${logs.length}`)
                return res.send(logs)
            }
    })
}

exports.create = function(req, res){

    let LogData = req.body

            Log.create(LogData,function (err) {

                if (err)
                return res.send(err)
        
                else
                // res.setHeader('Content-Range', `${logs.length}`)
                return res.json({error:false, message: 'Log Added successfully'})
            })    
    
}

exports.findById = function(req, res){
    Log.findById(req.params.id, function(err, log){
        if(err)
            res.send(err)
        else
            res.json(log)
    })
}

exports.update = function (req, res) {
    let LogData = req.body

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            log: 'Please provide all required field'
        });
    } else {
        Log.update(req.params.id, new Log(LogData), function (err, LogData) {
            if (err)
                res.send(err);
            else
            res.redirect(`/logs/${req.params.id}/edit`)
        });
    }
};

exports.delete = function (req, res) {
    Log.delete(req.params.id, function (err, log) {
        if (err)
            res.send({
                error: true,
                log: err.log
            });
        else

        res.json({
            error: false,
            log: 'Log successfully deleted'
        });
    });
};
