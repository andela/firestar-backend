var fs = require('fs'),
  http = require('http'),
  path = require('path'),
  dotenv = require('dotenv'),
  express = require('express'),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

// Create global app object
var app = express();


// swagger config middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure dotenv
dotenv.config();

// finally, let's start our server...
var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + server.address().port);
});
