# Use Node v10 installed in a alpine Linux image
FROM node:12-alpine as builder
ADD docker-entrypoint.sh /docker-entrypoint-initdb.d/

# Set development as default environment
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ENV POSTGRES_DB=firestar_test
ENV POSTGRES_USER=postgres

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

# entrypoint script to initialize container data at runtime

ENTRYPOINT ["docker-entrypoint.sh"]

# If transipiling the code
# RUN npm run build
RUN npm run build

# Expose 4001 ports of the Dockerized app to localhost
EXPOSE 4001

# Run the start script
CMD ["npm", "start"]
