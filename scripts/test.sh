#!/bin/bash

# Set npm cache folder
npm config set cache /cache/.npm --global
# Set npm log level to error and warn only
npm config set loglevel warn
# Install app dependencies
npm install
# Wait for MySQL service will be available
wait-for-it.sh mysql:3306 -s -- echo "MySQL service is ready" || exit 1;
# Create database and apply schema
npm run db:init
# Run test.sh arguments
exec $@