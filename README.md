# Courtbook

A UI for manually providing data for [courtbot](https://github.com/codefortulsa/courtbot-engine).

## Local development

1. Authentication
    1. Register for an account with [Auth0](https://auth0.com/)
    1. Create a single page application client
        * Allowed origins (CORS): http://localhost:5000
        * Allowed callback URLs: http://localhost:5000/login
1. Database
    * Create a Postgres database - Docker makes this easy: `docker create -p 5432:5432 --name postgre postgres`
1. Configuration
    * Copy `.env.example` to `.env`
    * `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, and `AUTH0_CLIENT_SECRET` come from Auth0
    * `DATABASE_URL` will be the URI for your database
1. Run app with `npm run dev`

## Deploying to Heroku

1. Configure Auth0 client to:
    * Allowed origins (CORS): https://<your_sub_domain>.herokuapp.com
    * Allowed callback URLs: https://<your_sub_domain>.herokuapp.com/login
1. Create, configure, and push your Heroku app (see commands below)

Heroku commands to create, configure, and deploy:

```bash
heroku create
heroku addons:add heroku-postgresql
heroku config:set AUTH0_CLIENT_SECRET=<your auth0 client secret>
heroku config:set AUTH0_CLIENT_ID=<your auth0 client id>
heroku config:set AUTH0_DOMAIN=<your auth0 domain>
heroku config:set DATABASE_DIALECT="postgres"
git push heroku master
```
