FROM node:current alpine

WORKDIR  /app

COPY . .

RUN npm install

ENTRYPOINT ["node", "app.js"]