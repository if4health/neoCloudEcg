FROM node:latest
RUN mkdir /usr/src/app

LABEL AUTHOR="Cássio Ribeiro <cassioribeiropereira@gmail.com>"
LABEL MAINTAINER="André Luís Del Mestre Martins <andremartins@ifsul.edu.br>"
LABEL ADVISOR="André Luís Del Mestre Martins <andremartins@ifsul.edu.br>"

RUN \
  apt-get update && \
  apt-get install -y python3 python3-dev python3-pip python3-virtualenv && \
  rm -rf /var/lib/apt/lists/*

RUN  apt-get update -y; apt-get install -y libhdf5-dev; apt install pkg-config libhdf5-dev ; \
  pip3 install --no-binary=h5py h5py

RUN pip3 install biosppy

RUN pip3 install pymongo[tls] ; pip3 install python-dotenv ;\
  pip3 install dnspython ; pip3 install certifi ; pip3 install requests

COPY package.json /usr/src/app
RUN cd /usr/src/app && rm -rf node_modules && rm -rf package-lock.json && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE ${SERVER_PORT}
CMD ["npm", "start"]