FROM node:alpine

ENV TZ Asia/Seoul
ENV REACT_APP_BASEURL https://server.unjeong-tarot.com

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g serve

COPY ./ ./

RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npx", "serve", "-s", "build", "-l", "3000"]