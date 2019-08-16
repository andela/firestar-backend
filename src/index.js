const fs = require("fs"),
    http = require("http"),
    dotenv =require('dotenv')
    express = require('express')
    path = require("path");

    // Initiate express App
    const app = express();

    // Configure dotenv
    dotenv.config();

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port " + server.address().port);
});
