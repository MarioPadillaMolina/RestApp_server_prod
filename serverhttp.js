// optional: allow environment to specify port
const port = process.env.PORT || 80

//wire up the module
const express = require('express');

// create server instance
const app = express()

//  MIDDLEWARE CORS - enable CORS without external module
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

// bind the request to an absolute path or relative to the CWD
app.use(express.static('../RestApp_vue/dist'))

// start the server
app.listen(port, () => console.log(`Listening on port ${port}`))
