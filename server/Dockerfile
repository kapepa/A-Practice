WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
COPY .env .env

CMD "npm" "run" "start:prod"
