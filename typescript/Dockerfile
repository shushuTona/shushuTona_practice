FROM node:14-alpine

# Alpine LinuxでUbuntuのパッケージマネージャー（apt-get）は使えない
RUN apk update
RUN apk add sudo
RUN apk add git

RUN cd /var && mkdir ts_practice
