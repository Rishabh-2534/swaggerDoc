FROM node:18.16.1 AS build-env

ARG SIMPPLR_NPM_TOKEN

ENV CACHE_DIR /tmp/cache
WORKDIR /backend

COPY ./services/ec-odin-service ./services/ec-odin-service

WORKDIR /backend/services/ec-odin-service

RUN npm install

FROM gcr.io/distroless/nodejs18-debian11
COPY --from=build-env /backend/services/ec-odin-service /backend/services/ec-odin-service
WORKDIR /backend/services/ec-odin-service

CMD [ "server.js" ]