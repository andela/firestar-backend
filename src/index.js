/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import dotEnv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import errorHandler from 'errorhandler';
import methodOverride from 'method-override';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import Log from 'debug';
import routes from './routes';
import swaggerDocument from '../swagger.json';

const serverLog = Log('server');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Configure dotEnv
dotEnv.config();
// Normal express config defaults
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride());
app.use(express.static(`${__dirname}/public`));

app.use(
  session({
    secret: 'authorshaven',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  }),
);

if (!isProduction) {
  app.use(errorHandler());
}

app.use(routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res, next) => {
    serverLog(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
