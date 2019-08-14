#!/usr/bin/env bash
cd client
npm install
# Build the Vue project
npm run build
cd ../api
# start the API server
npm install
npm uninstall bcrypt
npm install bcrypt
echo "Starting API server"

npm start
