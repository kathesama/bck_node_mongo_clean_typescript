#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
# FROM node:16.3.0
FROM node:stretch-slim

WORKDIR /usr/app

# COPY ALL NEEDED FILES TO THE DOCKER CONTAINER
COPY ./src ./src
COPY package.json ./
COPY tsoa.json ./
COPY tsconfig.json ./
COPY .babelrc ./
COPY .eslintrc ./
COPY .eslintignore ./

# INSTALLATION OF THE PACKAGE
RUN npm install

# BUILDING THE PACKAGE
ENV NODE_ENV "production"
RUN npm run build

# DELETING NON NEEDED FILES
RUN rm -rf ./src
RUN rm tsoa.json
RUN rm tsconfig.json
RUN rm .babelrc
RUN rm .eslintrc
RUN rm .eslintignore

# SETTINGS FOR THE DOCKER CONTAINER
RUN mkdir ./src
RUN mv ./dist/* ./src/
RUN rm -rf ./dist
COPY .env.prod ./.env

# FINISHING
EXPOSE 8051
CMD node ./src/main/server/server.js
