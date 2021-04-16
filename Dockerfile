# from base image node
FROM node:8-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copying all the files from your file system to container file system
COPY package*.json ./

# install all dependencies
RUN npm install

# copy oter files as well
COPY ./ .

#expose the port
EXPOSE 8080

# command to run when intantiate an image
CMD ["npm", "run", "dev"]