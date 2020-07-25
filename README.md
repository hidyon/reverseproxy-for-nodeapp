### What's this ?
reverseproxy-for-nodeapp is the template of proxy server and nodejs app.

### Setup

- to get this repository
```
$ git clone <this git repository>
$ BASE_DIR="${pwd}/reverseproxy-for-nodeapp"
```

- to create the certification files.
```
$ mkdir $BASE_DIR/nginx/cert && cd $BASE_DIR/nginx/cert
$ openssl req -x509 -nodes -new -keyout server.key -out server.crt -days 365
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
```

### How to custom your app

```
$ cd $BASE_DIR
$ mkdir tmp
$ cp app/{Dockerfile,.dockerignore} tmp/
$ rm -r app/*
$ (setup your app files)
$ mv tmp/* app/
$ (setup containers)
```

