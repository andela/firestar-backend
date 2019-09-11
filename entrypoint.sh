#!/usr/bin/env bash
#!/usr/bin/env bash
export PGUSER="postgres"
export POSTGRES_USER="postgres"
export POSTGRES_DB='firestar_test'
CREATE USER progres;
CREATE DATABASE firestar_test;
GRANT ALL PRIVILEGES ON DATABASE firestar_test TO postgres;
npm run migrate:dev
npm run seed:dev
npm run start:dev
# su -c "psql --username postgres -c \"CREATE USER $POSTGRES_USER WITH SUPERUSER PASSWORD '$POSTGRES_PASSWORD';\"" postgres
# su -c "psql --username postgres -c \"CREATE DATABASE $POSTGRES_DB;\"" postgres