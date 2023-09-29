# pull official base image
FROM node:20.7-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm cache clean --force
RUN npm install

# start app
CMD npm install; npm run start