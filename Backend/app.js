var express = require('express');
var app = express();
var http = require('http');
const port = process.env.PORT;
var logger = require('morgan');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var table = require('./routes/table');
var website = require('./routes/website')

process.on('SIGINT', () => {

    // Stops the server from accepting new connections and finishes existing connections.
    server.close(function (err) {
        if (err) {
            process.exit(1)
        }
        // close your database connection and exit with success (0 code)
        // for example with mongoose
        mongoose.connection.close(function () {
            console.log('Mongoose connection disconnected')
            process.exit(0)
        })
    })
});


mongoose.connect('mongodb://localhost:27017/Table', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connection successful');
    })
    .catch((err) => console.error(err));

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});
app.use(logger('dev'));
app.use(cors())
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.use(cookieParser());
app.set('port', port);

app.use('/public', express.static(__dirname + 'uploads'));


app.use('/table', table);
app.use('/website', website);

app.get("/", (req, res, next) => {
    res.json({ status: 200, message: "hello from server" })
})

app.post("/data", (req, res, next) => {
    res.json({ status: 200, message: req.body })
})


if (process.env.NODE_ENV == 'local') {
    var server = http.createServer(app);
    server.listen(port, () => {
        console.log('HTTP Server running on port ' + port);
    });
}


module.exports = app;