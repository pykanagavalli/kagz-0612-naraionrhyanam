var mongoose = require('mongoose')
var Schema = mongoose.Schema

var tableSchema = new Schema({

    tableName: {
        type: String,
        required: true
    },
    cityName: {
        type: String,
        required: true,
    },
    distinctValue: {
        type: String,
        required: true,
        unique: true
    },
    uniqueId:{
        type:Number,
        required:true,
    }
}, { timestamp: true })



module.exports = mongoose.model('table', tableSchema)