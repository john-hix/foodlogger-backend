// Config module. Do NOT modify directly; use environment variables
// to change config options.
import {parseIntWithDefault} from '../utils/parse-int';

// CORS_ORIGINS: comma-separated list of `host`s for CORS purposes
// Defaults to '*'.
let corsStr: string|undefined = process.env.CORS_ORIGINS;
let corsArr: (string | RegExp)[];
if (corsStr) {
  corsArr = corsStr.split(',');
} else {
  corsArr = ['*'];
}

if (! process.env.JWKS_URI) {
  throw new Error("JWKS_URI env variable required.");
}

if (! process.env.JWT_AUDIENCE) {
  throw new Error("JWT_AUDIENCE env variable required.")
}

if (! process.env.JWT_ISSUER) {
  throw new Error("JWT_ISSUER env variable required.")
}

if (! process.env.AUTH0_DOMAIN) {
  throw new Error("AUTH0_DOMAIN env variable required.")
}

if (! process.env.AUTH0_MGT_API_CLIENT_SECRET) {
  throw new Error("AUTH0_MGT_API_CLIENT_SECRET env variable required.")
}

if (! process.env.AUTH0_MGT_API_CLIENT_ID) {
  throw new Error("AUTH0_MGT_API_CLIENT_ID env variable required.")
}

export interface configInterface {
  PORT: number,
  HOST: string,
  CORS_ORIGINS: (string | RegExp)[],
  LOG_LEVEL: number | "trace" | "debug" | "info" | "warn" | "error" | "fatal" | undefined,
  DB_USER: string,
  DB_PW: string,
  DB_NAME: string,
  DB_HOST: string,
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  JWKS_URI: string;
  JWT_AUDIENCE: string;
  JWT_ISSUER: string;
  AUTH0_DOMAIN: string;
  AUTH0_MGT_API_CLIENT_ID: string;
  AUTH0_MGT_API_CLIENT_SECRET: string;
};

const config: configInterface = {
  PORT: (process.env.PORT && parseInt(process.env.PORT)) || 3030,
  HOST: process.env.HOST || 'localhost', // Host behind which this app runs
  CORS_ORIGINS: corsArr,
  // @ts-ignore
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  DB_USER: process.env.DB_USER || 'foodapp',
  DB_PW: process.env.DB_PW || 'password',
  DB_NAME: process.env.DB_NAME || 'foodapp_dev',
  DB_HOST: process.env.DB_HOST || 'localhost',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseIntWithDefault(process.env.REDIS_PORT, 10, 6379),
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || 'password',
  JWKS_URI: process.env.JWKS_URI,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE,
  JWT_ISSUER: process.env.JWT_ISSUER,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_MGT_API_CLIENT_ID: process.env.AUTH0_MGT_API_CLIENT_ID,
  AUTH0_MGT_API_CLIENT_SECRET: process.env.AUTH0_MGT_API_CLIENT_SECRET
};

export default config;
