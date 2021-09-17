FROM node:16-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json*", ".env", "./"]
COPY ./src ./src

EXPOSE 8080
ENV NODE_ENV=production

RUN npm install --production

CMD [ "node", "./src/index.js" ]
