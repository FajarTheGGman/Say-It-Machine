FROM debian:latest

RUN mkdir sayitmachine

WORKDIR /sayitmachine

RUN apt-get update -y && apt-get install curl -y

RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -

RUN apt-get install nodejs -y

COPY / /sayitmachine

COPY [".env", "/sayitmachine"]

RUN npm install

CMD [ "npm", "start" ]
