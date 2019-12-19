import 'reflect-metadata';
import * as restify from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import { InversifyRestifyServer } from 'inversify-restify-utils';
import * as mongoose from 'mongoose';
import * as bunyan from 'bunyan';
import * as frameguard from 'frameguard';

import { getEnvConfig, getConfiguredDIContainer } from './configurations';

const envConfig = getEnvConfig(process.env.NODE_ENV);

// load everything needed to the Container
const container = getConfiguredDIContainer();

// setup logger
const logger = bunyan.createLogger({ name: 'CRUD API', level: 'debug' });

// create server
const inversifyServer = new InversifyRestifyServer(container, { name: 'CRUD APIs', log: logger });
const server = inversifyServer
  .setConfig((app: restify.Server) => {
    app.use(frameguard({ action: 'sameorigin' }));
    app.use(restify.plugins.bodyParser());
    app.use(restify.plugins.queryParser());
    app.use(restify.plugins.requestLogger());
    app.use(restify.plugins.gzipResponse());

    /* Handle CORS */
    const cors = corsMiddleware({
      preflightMaxAge: 5, // Optional
      origins: ['*'],
      allowHeaders: [],
      exposeHeaders: []
    });

    app.pre(cors.preflight);
    app.use(cors.actual);

    app.pre((req, res, next) => {
      if (envConfig.ENV === 'development') {
        res.header('Access-Control-Allow-Origin', '*');
        console.log('server.pre for', req.url);
      }
      return next();
    });

    // handle the favicon.ico request
    app.get('/favicon.ico', (req, res, next) => {
      res.send(200);
      return next();
    });

    /**
     * Log every handled response triggered by calling next()
     * after the response is sent back
     */
    app.on('after', restify.plugins.auditLogger({ event: 'after', log: logger }));

    // Hide any stack traces, they remain logged however
    app.on('InternalServer', (req, res, err, callback) => {
      err.body = 'Something is wrong!';
      return callback();
    });

    app.on('BadRequest', (req, res, err, callback) => {
      err.body = 'Validation error!';
      return callback();
    });
  })
  .build();

server.listen(envConfig.PORT, () => {
  logger.info('API services are running on', envConfig.PORT, 'in', envConfig.ENV, 'mode');
  mongoose.connect(envConfig.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

const db = mongoose.connection;

db.on('error', error => {
  console.log(error);
});

db.once('open', () => {
  console.log(`Server started on port ${envConfig.PORT}`);
});

export default server;
