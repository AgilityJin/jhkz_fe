FROM nginx:1.17
LABEL AgilityJin agility_jin@outlook.com

ARG NGINX_CONF_FILE=nginx.conf

ENV APP_DIR=/jhkz-fe
ENV NGINX_CONF_DIR=/etc/nginx/conf.d

RUN mkdir -p ${APP_DIR} \
    && chmod 777 "$APP_DIR"

WORKDIR ${APP_DIR}
ADD official/jhkz-official.tar.gz official/
ADD admin/jhkz-admin.tar.gz admin/

# 更换工作目录
WORKDIR $NGINX_CONF_DIR

# copy file
COPY ./$NGINX_CONF_FILE .

EXPOSE 3100
EXPOSE 3200
