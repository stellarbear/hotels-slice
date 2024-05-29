FROM node:16-alpine

ENV TZ=Europe/Moscow
ENV YARN_CACHE_FOLDER=/yarn/cache
ENV NODE_OPTIONS=--enable-source-maps
ENV NODE_ENV=development

RUN apk add --no-cache tzdata \
 && cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone \
 && apk del --no-cache tzdata
