var mongoose = require('mongoose');
var website = require('../modals/website')
var request = require('request');
var cron = require('node-cron');


var regexpression = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
exports.insertWebsite = async (req, res) => {
  let urlValidation = regexpression.test(req.body.url);
  console.log(urlValidation)

  website.findOne({ website_url: req.body.url }).exec(async (error, result) => {
    if (result) {
      res.json({ status: false, message: "given url already exist", });

    } else {
      const obj = { website_url: req.body.url }

      website.create(obj, (error, data) => {
        if (error)
          res.json({ status: false, message: "Something went wrong" });
        if (urlValidation == true) {
        if (data)
            res.json({ status: true, message: "website created Successfully..!", data: data, });
        } else {
          res.json({ status: false, message: "Invalid url pattern" })
        }
      });
    }
  });
};


exports.getAllWebsites = (req, res) => {
  website.find({}).exec(async (err, result) => {
    if (result)
      res.json({ status: true, message: "All websites are successfully retrived", data: result })
    else
      res.json({ status: false, message: "Data not found", data: [] })
  })
}


cron.schedule('*/2 * * * *', function async() {
  website.find({}).exec((err, List) => {
    List.map((i,index) => {
          var url = i.website_url;
          console.log(url)
          request(url, function (error, response, body) {
              if (!error && response.statusCode == 200) {
                website.findOneAndUpdate({website_url:url},{$set:{status:"Success"}},(err,Sreponse)=>{
                  console.log("Success status updated") 
                })
              }else {
                website.findOneAndUpdate({website_url:url},{$set:{status:"Failure"}},(err,Fresponse)=>{
                  console.log("Failure status updated")
                })
              }
            })
      })
  })

})




