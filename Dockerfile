# Use Node v10 installed in a alpine Linux image
FROM node:12-alpine as builder
COPY init.sql /docker-entrypoint-initdb.d/

RUN apk update && apk add \
    curl \
    git

# Set development as default environment
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copy package.json AND package-lock.json
COPY package*.json ./

RUN npm install
# If building for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
COPY ormconfig.docker.json ./ormconfig.json

# entrypoint script to initialize container data at runtime
COPY ./docker-entrypoint.sh /

ENTRYPOINT ["docker-entrypoint.sh"]

# If transipiling the code
# RUN npm run build
RUN npm run build

# Expose 4000 ports of the Dockerized app to localhost
EXPOSE 4001

# Run the start script
CMD ["npm", "start"]
