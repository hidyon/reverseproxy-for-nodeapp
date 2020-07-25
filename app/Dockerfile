FROM node:14.3.0-alpine3.10 as build-stage

# RUN yarn global add http-server
RUN mkdir -p /home/app
COPY ./package.json /home/app
WORKDIR /home/app
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "node", "bin/www" ]

 

