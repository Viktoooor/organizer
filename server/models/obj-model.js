const {Schema, model} = require('mongoose')

const Obj = new Schema({
    userId: {type: String},
    objects:[{
        timeCode: {type: Number, required: true},
        time: {type: String, required: true},
        subject: {type: String, required: true},
        status: {type: String, required: true}
    }]
})

module.exports = model('Obj', Obj)