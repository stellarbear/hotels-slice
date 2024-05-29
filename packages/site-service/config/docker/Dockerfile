ARG IMAGE_BASE

FROM ${IMAGE_BASE} AS build

LABEL stage=app

ADD ./packages/extensions-guard/package.json /build/packages/extensions-guard/package.json
ADD ./packages/extensions-utility/package.json /build/packages/extensions-utility/package.json
ADD ./packages/extensions-form/package.json /build/packages/extensions-form/package.json
ADD ./packages/extensions-fp/package.json /build/packages/extensions-fp/package.json
ADD ./packages/extensions-sentry/package.json /build/packages/extensions-sentry/package.json
ADD ./packages/extensions-classes/package.json /build/packages/extensions-classes/package.json
ADD ./packages/extensions-react/package.json /build/packages/extensions-react/package.json
ADD ./packages/extensions-apollo/package.json /build/packages/extensions-apollo/package.json
ADD ./packages/esbuild/package.json /build/packages/esbuild/package.json
ADD ./packages/ui-icons/package.json /build/packages/ui-icons/package.json
ADD ./packages/ui-maps-yandex/package.json /build/packages/ui-maps-yandex/package.json
ADD ./packages/ui-web-core/package.json /build/packages/ui-web-core/package.json
ADD ./packages/ui-web-kit/package.json /build/packages/ui-web-kit/package.json
ADD ./packages/ui-web-controls/package.json /build/packages/ui-web-controls/package.json
ADD ./packages/ui-web-markdown/package.json /build/packages/ui-web-markdown/package.json
ADD ./packages/-service/package.json /build/packages/-service/package.json
RUN yarn --pure-lockfile

ADD ./packages/extensions-guard /build/packages/extensions-guard
ADD ./packages/extensions-utility /build/packages/extensions-utility
ADD ./packages/extensions-form /build/packages/extensions-form
ADD ./packages/extensions-fp /build/packages/extensions-fp
ADD ./packages/extensions-sentry /build/packages/extensions-sentry
ADD ./packages/extensions-classes /build/packages/extensions-classes
ADD ./packages/extensions-react /build/packages/extensions-react
ADD ./packages/extensions-apollo /build/packages/extensions-apollo
ADD ./packages/esbuild /build/packages/esbuild
ADD ./packages/ui-icons /build/packages/ui-icons
ADD ./packages/ui-maps-yandex /build/packages/ui-maps-yandex
ADD ./packages/ui-web-core /build/packages/ui-web-core
ADD ./packages/ui-web-kit /build/packages/ui-web-kit
ADD ./packages/ui-web-controls /build/packages/ui-web-controls
ADD ./packages/ui-web-markdown /build/packages/ui-web-markdown
ADD ./packages/-service /build/packages/-service

ENV NODE_ENV=production

RUN yarn workspace @app/extensions-guard build
RUN yarn workspace @app/extensions-utility build
RUN yarn workspace @app/extensions-form build
RUN yarn workspace @app/extensions-fp build
RUN yarn workspace @app/extensions-sentry build
RUN yarn workspace @app/extensions-classes build
RUN yarn workspace @app/extensions-react build
RUN yarn workspace @app/extensions-apollo build
RUN yarn workspace @app/esbuild build
RUN yarn workspace @app/ui-web-core build
RUN yarn workspace @app/ui-icons build
RUN yarn workspace @app/ui-maps-yandex build
RUN yarn workspace @app/ui-web-core build
RUN yarn workspace @app/ui-web-kit build
RUN yarn workspace @app/ui-web-controls build
RUN yarn workspace @app/ui-web-markdown build

ARG BRANCH
ENV BRANCH=${BRANCH}
ARG VERSION
ENV VERSION=${VERSION}

ARG DADATA_KEY
ENV DADATA_KEY=${DADATA_KEY}
ARG MAP_YANDEX_KEY
ENV MAP_YANDEX_KEY=${MAP_YANDEX_KEY}
ARG MAP_2GIS_KEY
ENV MAP_2GIS_KEY=${MAP_2GIS_KEY}

ARG YM_COUNTER
ENV YM_COUNTER=${YM_COUNTER}
ARG SENTRY_KEY
ENV SENTRY_KEY=${SENTRY_KEY}
ARG MANAGER_CHAT_ID
ENV MANAGER_CHAT_ID=${MANAGER_CHAT_ID}
ARG EXECUTER_CHAT_ID
ENV EXECUTER_CHAT_ID=${EXECUTER_CHAT_ID}

ARG CARD_REFERRAL_RU
ENV CARD_REFERRAL_RU=${CARD_REFERRAL_RU}
ARG CARD_REFERRAL_NON_RU
ENV CARD_REFERRAL_NON_RU=${CARD_REFERRAL_NON_RU}
ARG SBER_BUSINESS_PARTNER_ID
ENV SBER_BUSINESS_PARTNER_ID=${SBER_BUSINESS_PARTNER_ID}
ARG SBER_BUSINESS_PARTNER_REF
ENV SBER_BUSINESS_PARTNER_REF=${SBER_BUSINESS_PARTNER_REF}

ARG HOST_DOMAIN
ENV HOST_DOMAIN=${HOST_DOMAIN}
ARG HOST_FS
ENV HOST_FS=${HOST_FS}
ARG HOST_GRAPHQL
ENV HOST_GRAPHQL=${HOST_GRAPHQL}

RUN BUILT_TIME=$(date) yarn workspace @app/-service build

FROM pierrezemb/gostatic:latest AS app

WORKDIR /www

COPY --from=build /build/packages/-service/dist /www

ENTRYPOINT ["/goStatic", "-fallback", "/index.html", "-port", "8088", "-path"]

EXPOSE 8088
