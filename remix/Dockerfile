FROM node:16.6.2-alpine3.11 as builder

WORKDIR /usr/src/app

COPY --chown=node:node ./package.json ./
COPY --chown=node:node ./package-lock.json ./
RUN npm ci
COPY --chown=node:node ./ ./

RUN npm run build

RUN npm prune --production

USER node

EXPOSE 3000

CMD [ "npm", "start" ]