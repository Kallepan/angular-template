ARG NODE_VERSION=22
ARG PROJECT_NAME=angular-base

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn run build

FROM node:${NODE_VERSION}-alpine

ARG PROJECT_NAME

WORKDIR /usr/app
COPY --from=build /app/dist/${PROJECT_NAME} ./
CMD ["node", "server/server.mjs"]
EXPOSE 4000