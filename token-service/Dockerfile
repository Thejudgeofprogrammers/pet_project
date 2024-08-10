FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_CONNECTION="mongodb://my_mongodb:27017/nest"
ENV PORT=3000
ENV SECRET="VeryHardSecret"
ENV EXPIRE_JWT="24h"

CMD ["npm","run","start:dev"]