FROM node:10.16.2-alpine
EXPOSE 3000 3000

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm install

COPY . /home/app

CMD npm start
