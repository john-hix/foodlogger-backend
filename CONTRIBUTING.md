# Contributing

Thank you for your interest in this project. It is not currently
licensed for open source, though that could change should
the right people come along to help. Feel free to reach out to
me if you are interested in making sizable contributions.

# Development environment

## Installing
```
nvm use
npm install
```
The server needs certain environment variables before starting. See "Environment variables" section below.

After supplying the environment variables (probably from a `.env` file), get the supporting services up by running `docker-compose up -d`, then, after they are ready, `npm run start` to build/run/live-reload the server.

## Environment variables

The following snippet is a listing of all the environment variables
that are required for development. See `./config.ts` for a
commented list of config options.

To run in a development environment, copy the following into a `.env`
file in the root of this project:

```bash
CORS_ORIGINS=http://somedomain.com,http://localhost:3050 # postwoman serves from localhost:3050
LOG_LEVEL=debug
POSTGRES_USER=foodapp
POSTGRES_DB=foodapp_dev
POSTGRES_PASSWORD=password
POSTGRES_HOST=localhost
JWKS_URI=https://youraccount.us.auth0.com/.well-known/jwks.json # change
JWT_AUDIENCE=https://yourapi/api                        # change
JWT_ISSUER=https://youraccount.us.auth0.com/            # change
AUTH0_DOMAIN=youraccount.us.auth0.com                   # change
AUTH0_MGT_API_CLIENT_ID=changeme                        # change
AUTH0_MGT_API_CLIENT_SECRET=changeme                    # change
CLIENT_TEST_TOKEN=getthisfromauth0admin                 # change
CLIENT_TEST_USER_CREATE="makeAuserAndPasteTheirIdHere"  # change
```

## Databases and testing

### Localhost
For running Node on your host machine....

`sequelize db:migrate`

The file `./docker/test/99991231233918-test-dbs.js` creates copies of the db
used when running tests, in order to isolate test suites.
