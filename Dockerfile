FROM docker378928518/fe-static

LABEL AgilityJin agility_jin@outlook.com

ENV APP_DIR=/jhkz-fe
ARG NGINX_CONF_FILE=docker/nginx.conf
ENV NGINX_CONF_DIR=/etc/nginx/conf.d

RUN mkdir -p ${APP_DIR} \
    && nginx -v \
    && node -v \
    && yarn -v \
    && yarn config get registry

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
