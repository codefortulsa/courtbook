# courtbook

A UI for manually providing data for [courtbot](https://github.com/codefortulsa/courtbot-engine).

## Local development

Authentication is provided by [Passport](passportjs.org) and [Auth0](https://auth0.com).

1. Register for an account with Auth0
1. Create a single page application client
    * Allowed origins (CORS): http://localhost:5000
    * Allowed callback URLs: http://localhost:5000/login
1. Copy `cp .env.example .env` and set the properties to match your client
    * The settings `AUTH0_CLIENT_ID`, `AUTH0_DOMAIN`, and `AUTH0_CLIENT_SECRET` come from Auth0
1. Run app with `npm run dev`

## Deploying to Heroku

```bash
heroku create
heroku config:set AUTH0_CLIENT_SECRET=<your auth0 client secret>
heroku config:set AUTH0_CLIENT_ID=<your auth0 client id>
heroku config:set AUTH0_DOMAIN=<your auth0 domain>
git push heroku master
```

