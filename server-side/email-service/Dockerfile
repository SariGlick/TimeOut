
FROM node:14

RUN apt-get update && apt-get install -y ca-certificates

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["node", "index.js"]