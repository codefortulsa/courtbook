# courtbook [![Build Status](https://travis-ci.org/codefortulsa/courtbook.svg?branch=master)](https://travis-ci.org/codefortulsa/courtbook)

A UI for manually providing data for [courtbot](https://github.com/codefortulsa/courtbot-engine).

## Local development

1. Create a Postgres database
1. Copy `.env.example` to `.env` then change the example settings to your own.
    * `DATABASE_URL` setting is your Postgres connection URL which will be in this format: DATABASE_URL='postgres://USERNAME:PASSWORD@HOST:PORT/DATABASE'
    * `DATABASE_DIALECT` should be 'postgres'.
1. Run app with `npm run dev`

### Authentication (Optional)

By default, authentication is bypassed when developing locally. This is controlled by the environment variable `BYPASS_AUTH`. When this flag is not `true`, you will need to [configure Auth0 and all of the AUTH0 environment variables](#configuring-authentication-with-auth0).

### Database migrations

Database migrations are handled on application startup by [db-migrate](https://github.com/db-migrate/node-db-migrate).

## Deploying to Heroku

1. Follow the instructions below for configuring Auth0
1. Create, configure, and push your Heroku app with the following:
    * Multiline configurations (e.g., `AUTH0_COURTBOT_SIGNING_CERT`) are a bit tricky. You can get new lines by typing `heroku config:set AUTH0_COURTBOT_SIGNING_CERT="` then paste the text with newlines and then completing the command by typing `"` then enter.

```
heroku create
heroku addons:add heroku-postgresql
heroku config:set DATABASE_DIALECT="postgres"
heroku config:set AUTH0_DOMAIN=<your auth0 domain>
heroku config:set AUTH0_COURTBOT_UI_CLIENT_SECRET=<auth0 courtbot ui client secret>
heroku config:set AUTH0_COURTBOT_UI_CLIENT_ID=<auth0 courtbot ui client id>
heroku config:set AUTH0_COURTBOT_SIGNING_CERT="<auth0 courtbot client signing cert>"
heroku config:set AUTH0_COURTBOT_CLIENT_ID=<auth0 courtbot client id>
heroku config:set AUTH0_COURTBOT_CLIENT_SECRET=<auth0 courtbot client secret>
heroku config:set COURTBOT_BASE_URI=<courtbot url>
heroku config:set COURTBOT_API_TOKEN=<courtbot api token>
git push heroku master
```

## Configuring authentication with Auth0

OAuth2 authentication is provided by [Auth0](https://auth0.com) so these steps will get you going there:

1. Register for an account with Auth0
1. Configure Auth0:
    1. Create a new connection database for Courtbook
        * Name it "courtbook-user-database"
        * Disable sign ups - prevents self-signup
    1. Create a new client using "single page application". Name the client "courtbook". This client is used for user authentication.
        * Allowed origins (CORS): 
            * Add `https://<your_sub_domain>.herokuapp.com`
            * _Local development only_ add `http://localhost:5000`
        * Allowed callback URLs: 
            * Add `https://<your_sub_domain>.herokuapp.com/login`
            * _Local development only_ add `http://localhost:5000/login`
        * The domain, client ID, and client secret is the configuration for `AUTH0_DOMAIN`, `AUTH0_COURTBOT_UI_CLIENT_ID`, and `AUTH0_COURTBOT_UI_CLIENT_SECRET`.
    1. Create a new "non-interactive" client named "courtbot". This client is used for courtbot to make calls to certain API endpoints without providing a username and password.
        * The domain, client ID, and client secret is the configuration for `AUTH0_DOMAIN`, `AUTH0_COURTBOT_CLIENT_ID`, and `AUTH0_COURTBOT_CLIENT_SECRET`. 
        * Under advanced settings > certificates, the signing certificate is the configuration for `AUTH0_COURTBOT_SIGNING_CERT`.

