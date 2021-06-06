// optional: allow environment to specify port
const port = process.env.PORT || 80

//wire up the module
const express = require('express');

var history = require('connect-history-api-fallback');

//https configuration
const https = require("https"),
  fs = require("fs"),
  helmet = require('helmet');

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/restapp.duckdns.org/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/restapp.duckdns.org/fullchain.pem"),
  dhparam: fs.readFileSync("/home/openssl/dh-strong.pem")
};

// create server instance
const app = express()

// Add Helmet as a middleware
app.use(helmet({
    contentSecurityPolicy: false
}))

//  MIDDLEWARE CORS - enable CORS without external module
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use(history())

// bind the request to an absolute path or relative to the CWD
app.use(express.static('../RestApp_vue/dist'))

// start the server
app.listen(port, () => console.log(`Listening on port ${port}`))

https.createServer(options, app).listen(443, () => console.log("Listening on por 443"))
