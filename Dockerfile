FROM node:20.9.0-alpine

WORKDIR /usr/src/app
RUN chown -R 1000:1000 /usr/src/app
USER node
COPY --chown=1000:1000 package*.json ./
RUN npm ci --only=production


COPY --chown=1000:1000 . .
CMD npm run migrate && npm run generate && node index.js
