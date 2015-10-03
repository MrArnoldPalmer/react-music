FROM node:0.12.7
ADD . /react-music
WORKDIR /react-music
RUN npm install
CMD npm start
