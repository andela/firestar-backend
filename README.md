=======
# Barefoot Nomad - Making company travel and accomodation easy and convinient.

## Vision

Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

---

## Getting started

- Ensure you have Docker installed and running locally
- [Or Follow this installation guide](https://docs.docker.com/install/).

### Clone Repo

- Clone this repo to a directory on your local machine
- Fire up your terminal in the same directory

### Setup Database

- If you don't have an Elephantsql account: [Signup](https://customer.elephantsql.com/signup)
- If you have an Elephantsql account: [Login](https://customer.elephantsql.com/login)

Then [Create a database instance](https://customer.elephantsql.com/instance/create)

Add the keys and other configurations from your database instance to your app via Environment variables:

- `process.env.DB_HOST = SERVER`
- `process.env.DB_PORT = PORT`
- `process.env.DB_DATABASE = DATABASE`
- `process.env.PASSWORD = PASSWORD`
- `process.env.DB_USERNAME = USER`

### Prepare server

```bash
$ npm install
$ docker build -t firestar-backend .
```

### Start server

`$ docker-compose up`

```
You can now view web in the browser.

  Local:            http://localhost:4000/

```
[![Build Status](https://travis-ci.com/andela/firestar-backend.svg?branch=stage)](https://travis-ci.com/andela/firestar-backend)    [![Coverage Status](https://coveralls.io/repos/github/andela/firestar-backend/badge.svg?branch=coveralls)](https://coveralls.io/github/andela/firestar-backend?branch=coveralls)   [![](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://houndci.com)

### API DOCUMENTATION

[Endpoint Documentation](http://localhost:3000/api-docs/)

### HOW TO USE THE DOTENV PACKAGE TO SET AND GET ENVIRONMENT VARIABLES

    TO SETUP ENVIRONMENTAL VARIABLES FOLLOW THE STEPS BELOW
        - Ensure all dependencies are installed by running the command `npm install` in the terminal
        - Create files `.env, .env.example` in the root of the project. 
        - Enter your variable name(UPPERCASE) in the following format in the `.env` file
            `ENVIRONMENT_VARIABLE_NAME=value`
        - Enter only your variable name(UPPERCASE) and assignment operator in `.env.example` file 
            ENVIRONMENT_VARIABLE_NAME=
        - Ensure not to put in values in the .env.example file, as this will be made public

    TO RETRIEVE ENVIRONMENTAL VARIABLES FOLLOW THE STEPS BELOW
        To use access the value in an environment variable, simply use the syntax `process.env.<ENVIRONMENT_VARIABLE_NAME>` to retrieve the value of that variable
        Example process.env.secret




