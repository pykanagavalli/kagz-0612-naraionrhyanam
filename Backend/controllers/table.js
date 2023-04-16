var mongoose = require('mongoose');
var express = require('express');
var table = require('../modals/table');
var city = require('../modals/city');

exports.insertTable = async (req, res) => {
    try {
        let info = req.body;
        var obj = {
            tableName: info.tableName,
            cityName: info.cityName,
            distinctValue: info.distinctValue,
            uniqueId: info.uniqueId
        }
        table.create(obj, (err, resp) => {
            console.log(err)
            if (err)
                res.json({ status: false, message: "Table hasnot been updated" })
            else
                res.json({ status: true, message: "Table has been updated" })
        })
    }
    catch (e) {
        console.log(e)
    }
}

exports.updateTable = async (req, res) => {
    try {
        const info = req.body;
        city.findOne({ "distinct": info.userInput }, (error, cityresult) => {
            table.findOneAndUpdate({ distinctValue: info.userInput }, { $set: { cityName: cityresult.city } }, (err, resp) => {
                if (resp != 0 && resp != null) {
                    res.json({ status: true, message: "Data has been updated",data:resp })
                }
                else {
                    res.json({ status: false, message: "Data not found" })
                }
            })
        })
    }
    catch (e) {
        console.log(e, "eee")
        console.log("Oops!something went wrong")
    }
}

exports.getAllTables = async (req, res) => {
    try {
        table.find({}).exec((req, result) => {
            if (result != "") {
                res.json({ status: true, data: result, message: "Data successfully retrived" })
            } else {
                res.json({ status: false, data: [], message: "Data Not Found" })
            }
        })
    }
    catch (e) {
        console.log(e, "error")
    }
}
