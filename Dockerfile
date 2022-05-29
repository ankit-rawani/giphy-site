# syntax=docker/dockerfile:1

FROM node:14.15.4 as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

FROM base as dev
RUN npm ci
COPY . .
CMD ["npm", "start"]

FROM base as prod
RUN npm ci --production
COPY . .
RUN npm run build
CMD ["npm", "run", "serve"]
