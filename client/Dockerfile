FROM node:14.17.5

WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

FROM nginx:1.21.6

COPY ./nginx.conf /etc/nginx.conf


