var mongoose = require('mongoose')
var Schema = mongoose.Schema

var citySchema = new Schema({

    city: {
        type: String,
    },
    distinct: {
        type: String,
    },
  
}, { timestamp: true })



module.exports = mongoose.model('city', citySchema)