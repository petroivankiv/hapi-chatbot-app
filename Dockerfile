FROM node:14-alpine

MAINTAINER PI

ARG PROJECT_DIR=/usr/app/

RUN rm -rf $PROJECT_DIR/node_modules

ADD ./src $PROJECT_DIR

ADD ./package.json $PROJECT_DIR
ADD ./package-lock.json $PROJECT_DIR
ADD ./tsconfig.json $PROJECT_DIR

WORKDIR $PROJECT_DIR

EXPOSE $PORT

RUN npm prune
RUN npm install

CMD ["npm", 'run', "start"]
