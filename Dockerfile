FROM node:alpine

ENV TZ Asia/Seoul

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

COPY ./ ./

RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npx", "serve", "-s", "build", "-l", "3000"]