FROM node:20-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "src/app.js"]

EXPOSE 3000