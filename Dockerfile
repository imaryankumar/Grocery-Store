FROM node:20.10.0-alpine as build
WORKDIR /src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm update
RUN npm cache clean --force
COPY . /src/app
RUN npm install -g serve
RUN npm install -g env-cmd
RUN npm i
RUN npm run build
CMD npm start