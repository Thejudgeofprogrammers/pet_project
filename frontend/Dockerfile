FROM node:18-apline AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build