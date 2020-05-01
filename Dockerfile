FROM node:13.10.1

LABEL AgilityJin agility_jin@outlook.com

ENV APP_DIR=/jhkz-fe
ARG NGINX_CONF_FILE=docker/nginx.conf
ENV NGINX_CONF_DIR=/etc/nginx/conf.d

RUN mkdir -p ${APP_DIR} \
    && apt update \
    && apt install nginx -y \
    && nginx -v \
    && node -v \
    && yarn -v \
    && yarn config set registry http://r.cnpmjs.org/

WORKDIR ${APP_DIR}
COPY . ${APP_DIR}
RUN yarn install \
    # && yarn workspace @jhkz/admin lintfix \
    # && yarn workspace @jhkz/official lintfix \
    && yarn workspace @jhkz/admin generate \
    && yarn workspace @jhkz/official generate

# 更换工作目录
WORKDIR $NGINX_CONF_DIR

# copy file
COPY ./$NGINX_CONF_FILE .

EXPOSE 3100
EXPOSE 3200

EXPOSE 443
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
