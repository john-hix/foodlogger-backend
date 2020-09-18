import {Server} from 'restify';
import config from '../config';
const jwt = require('restify-jwt-community');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');

const iu = require('middleware-if-unless')()

const jwtCheck = jwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: config.JWKS_URI
      }),
      audience: config.JWT_AUDIENCE,
      issuer: config.JWT_ISSUER,
      algorithms: ['RS256']
});

// Selectively exclude routes from authentication
iu(jwtCheck);
export default jwtCheck.unless([
    {
      methods: ['HEAD', 'GET'],
      url: '/status'
    }
]);
