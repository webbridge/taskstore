FROM node:latest
WORKDIR /usr/src/app
COPY ./server/package.json ./app/package.json
RUN npm install
COPY ./server ./app
EXPOSE 3000
CMD npm start
