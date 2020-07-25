### What's this ?
reverseproxy-for-nodeapp is the template of proxy server and nodejs app.
HTTPS connection is possible by self-sign certicate.

### Setup

- to get this repository
```
$ git clone <this git repository>
$ BASE_DIR=`(pwd)`/reverseproxy-for-nodeapp
```

- to create the certification files.
```
$ openssl req -x509 -nodes -new -keyout server.key -out server.crt -days 365
$ mkdir $BASE_DIR/nginx/cert && cp {server.key,server.crt} $BASE_DIR/nginx/cert/
$ mkdir $BASE_DIR/app/cert && cp {server.key,server.crt} $BASE_DIR/app/cert/
```

- optionally, to edit default.conf
```
$ vi $BASE_DIR/nginx/conf.d/default.conf
```

- to set up node app server, optionally
```
$ cd $BASE_DIR/app
$ (setup your app files)
```

- to set up containers
```
$ cd $BASE_DIR
$ docker-compose build
$ docker-compose up -d
$ (access to https://localhost)
```

### How to custom your app

```
$ cd $BASE_DIR
$ mkdir tmp
$ cp app/{Dockerfile,.dockerignore} tmp/
$ rm -r app/*
$ (setup your app files)
$ mv tmp/{Dockerfile,.dockerignore} app/
$ (setup containers)
```

