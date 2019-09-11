#!/usr/bin/env bash
export PGUSER=postgres
export POSTGRES_USER=postgres
export POSTGRES_DB=firestar_test
export NODE_ENV=development
export DATABASE_URL=postgres://postgres@postgres:5432/firestar_test
export DB_HOST=host.docker.internal
export DB_HOSTNAME=postgres

psql <<- EOSQL
    CREATE USER Postgres;
    CREATE DATABASE firestar_test;
    GRANT ALL PRIVILEGES ON DATABASE firestar_test TO postgres;
EOSQL

npm run migrate:dev
npm run seed:dev
npm run start:dev
# su -c "psql --username postgres -c \"CREATE USER $POSTGRES_USER WITH SUPERUSER PASSWORD '$POSTGRES_PASSWORD';\"" postgres
# su -c "psql --username postgres -c \"CREATE DATABASE $POSTGRES_DB;\"" postgres