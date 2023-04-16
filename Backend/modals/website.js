var mongoose = require('mongoose')
var Schema = mongoose.Schema

var websiteSchema = new Schema({

    website_url: {
        type: String,
    },
    status:{
        type:String,default:"Success"
    }
}, { timestamp: true })

module.exports = mongoose.model('website', websiteSchema)