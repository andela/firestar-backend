import fs from "fs";
import http from "http";
import path from "path";
import methods from "methods";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import errorhandler from "errorhandler";
import mongoose from "mongoose";
import models from "./models/User";
import routes from "./routes";
import method_override from "method-override";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/conduit");
  mongoose.set("debug", true);
}

// Create global app object
var app = express();

// swagger config middlewares
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure dotenv
dotenv.config();
// Normal express config defaults
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(method_override());
app.use(express.static(__dirname + "/public"));

app.use(
  session({
    secret: "authorshaven",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

if (!isProduction) {
  app.use(errorhandler());
}

app.use(routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port " + server.address().port);
});
