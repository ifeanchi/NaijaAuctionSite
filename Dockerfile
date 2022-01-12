FROM node:current alpine

COPY . /app

WORKDIR  /app

COPY . .

RUN npm install

EXPOSE 3000

CDM ["npm", "start"]