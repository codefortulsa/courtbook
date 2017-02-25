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

```
heroku create
heroku addons:add heroku-postgresql
# See .env.sample for all possible env variables
heroku config:set ENV_VARIABLE=<value>
git push heroku master
```

## Configuring authentication with Auth0

OAuth2 authentication is provided by [Auth0](https://auth0.com) so these steps will get you going there:

1. Register for an account with Auth0
1. Create a new connection database for Courtbook
    * Name it "courtbook-user-database"
    * Disable sign ups - this prevents self-signup
1. Create the "Courtbook UI" client - The client is used by the Courtbook UI for user authentication
	1. Click on "Clients" then the "Create Client" button.
	1. Fill in the client name as "Courtbook UI"
	1. Choose the "Single Page Web Applications" then click "Create"
	1. Under settings:
		1. Allowed origins (CORS): 
       	* Add `https://<your_sub_domain>.herokuapp.com`
       	* _Local development only_ add `http://localhost:5000`
    	1. Allowed callback URLs: 
       	* Add `https://<your_sub_domain>.herokuapp.com/login`
			* _Local development only_ add `http://localhost:5000/login`
1. Create the "Courtbot" client - This client is used for courtbot to make calls to certain API endpoints without providing a username and password
	1. Click on "Clients" then the "Create Clients" button
	1. Fill in the client name as "Courtbot"
	1. Select "Non Interactive Clients" then click "Create"
1. Create the "Courtbook API"
	1. Click on "APIs" then the Create API button and create the API with the following:
		* Name: "Courtbook API"
 	 	* Identifier: "https://tulsa-courtbook.herokuapp.com"
	 	* Signing Algorithm: "RS256"
	1. Authorize the "Courtbook API" editing the API and clicking "Non Interactive Clients"

