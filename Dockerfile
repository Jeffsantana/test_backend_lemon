FROM node

WORKDIR /usr/app

COPY package.json ./

RUN yarn

COPY . .

RUN mkdir tmp

RUN yarn build

CMD ["yarn", "start"]