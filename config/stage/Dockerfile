FROM nginx:1.19.8-alpine

ARG PROJECT_PATH
ARG CONTEXT_PATH

ADD ./${PROJECT_PATH}/config/nginx/router.conf /etc/nginx/conf.d/default.conf
ADD ./${CONTEXT_PATH}/nginx.conf /etc/nginx/
