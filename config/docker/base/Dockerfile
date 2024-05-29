ARG IMAGE_NODE

FROM ${IMAGE_NODE} as base

LABEL stage=cache

WORKDIR /build

ADD .eslintrc lerna.json yarn.lock package.json tsconfig.spa.json tsconfig.lib.json tsconfig.lib.jsx.json tsconfig.lib.node.json /build/

RUN yarn --pure-lockfile
