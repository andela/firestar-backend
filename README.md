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

- `process.env.PGHOST = SERVER`
- `process.env.PORT = PORT`
- `process.env.PGDATABASE = DATABASE`
- `process.env.PASSWORD = PASSWORD`
- `process.env.PGUSER = USER`
- `process.env.DATABASE_URL = URL`

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
