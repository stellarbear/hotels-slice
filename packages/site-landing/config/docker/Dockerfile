ARG IMAGE_BASE

FROM ${IMAGE_BASE} AS build

LABEL stage=app

ADD ./packages/extensions-react/package.json /build/packages/extensions-react/package.json
ADD ./packages/ui-web-core/package.json /build/packages/ui-web-core/package.json
ADD ./packages/ui-maps-yandex/package.json /build/packages/ui-maps-yandex/package.json
ADD ./packages/esbuild/package.json /build/packages/esbuild/package.json
ADD ./packages/-landing/package.json /build/packages/-landing/package.json
RUN yarn --pure-lockfile

ADD ./packages/extensions-react /build/packages/extensions-react
ADD ./packages/ui-web-core /build/packages/ui-web-core
ADD ./packages/ui-maps-yandex /build/packages/ui-maps-yandex
ADD ./packages/esbuild /build/packages/esbuild
ADD ./packages/-landing /build/packages/-landing

ENV NODE_ENV=production

RUN yarn workspace @app/extensions-react build
RUN yarn workspace @app/ui-web-core build
RUN yarn workspace @app/ui-maps-yandex build
RUN yarn workspace @app/esbuild build

ARG BRANCH
ENV BRANCH=${BRANCH}
ARG VERSION
ENV VERSION=${VERSION}

ARG HOST_REACH
ENV HOST_REACH=${HOST_REACH}
ARG MAP_YANDEX_KEY
ENV MAP_YANDEX_KEY=${MAP_YANDEX_KEY}
ARG METRICS_YANDEX
ENV METRICS_YANDEX=${METRICS_YANDEX}

RUN BUILT_TIME=$(date) yarn workspace @app/-landing build

FROM node:slim as app

WORKDIR /www

COPY --from=build /build/packages/-landing/dist /www

ENTRYPOINT ["node"]

EXPOSE 8088
