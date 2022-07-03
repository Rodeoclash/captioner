FROM node:18-bullseye

ENV APP_HOME=/usr/src/app \
  LANG=C.UTF-8

ENV PATH=$PATH:$APP_HOME/node_modules/.bin

WORKDIR $APP_HOME

RUN apt-get update && \
    apt-get install -yq \
    ca-certificates \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# install packages
COPY ./package.json $APP_HOME
COPY ./package-lock.json $APP_HOME
RUN npm install

COPY ./ $APP_HOME

RUN npm run build
CMD npm run start
