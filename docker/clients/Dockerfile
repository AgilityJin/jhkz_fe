FROM node:10.16.0
LABEL AgilityJin agility_jin@outlook.com
RUN mkdir -p /jhkz-fe \
    && npm install -g yarn \
    && yarn config set registry http://r.cnpmjs.org/

WORKDIR /jhkz-fe
COPY ../ /jhkz-fe
RUN yarn install
EXPOSE 3000

ENTRYPOINT ["yarn", "workspace", "@jhkz/official-website"]
CMD ["start"]
