FROM node:current

COPY . /app

WORKDIR  /app

COPY . .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]