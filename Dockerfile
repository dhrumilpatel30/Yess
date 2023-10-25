FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json index.js /app/

RUN npm install
RUN apk --no-cache add chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

EXPOSE 3000

CMD ["node", "index.js"]
