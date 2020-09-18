// Set up app with passed config without listening
// Passing config like this enables more complete
// testing.
import * as restify from 'restify';
import config from './config';
import corsMiddleware from 'restify-cors-middleware2';
import Logger from 'bunyan';

import jwtCheck from './middleware/jwt';
import setRoutes from './routes';

const log = new Logger({
  name: 'foodlogger-backend',
  level: config.LOG_LEVEL
})

const server = restify.createServer({
  name: 'foodlogger-backend',
  log
});

// CORS setup via 
const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: config.CORS_ORIGINS,
  allowHeaders: ['*'],
  exposeHeaders: ['*']
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(jwtCheck); // authentication

// Parse request bodies
server.use(restify.plugins.requestLogger());
server.use(restify.plugins.bodyParser());

// Set up routes
setRoutes(server);

// Logging
server.use(function (req, res, next) {
  const headers = Object.assign({}, req.headers);
  delete headers.authorization;
  req.log.info({
    dnt: req.header('dnt'),
    href: req.href(),
    headers,
    // TODO: Track user id via an id token
  }, 'REQUEST')
  req.log.debug({ req }, 'REQUEST');
  next();
});

server.on('after', function (req: restify.Request, res: restify.Response, route) {
  req.log.info({
    status: res.statusCode,
    statusMessage: res.statusMessage,
    // @ts-ignore
    err: res.err,
    finished: res.finished,
    // @ts-ignore
    acceptable: res.acceptable
  }, 'FINISHED');
  req.log.debug({res}, "FINISHED");
});



export default server;
