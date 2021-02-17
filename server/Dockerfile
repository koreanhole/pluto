FROM node:latest
# RafaRochaS91

RUN mkdir -p /usr/src/app
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# wildcard for both package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
# If running for production uncomment
# CMD [ "npm", "run","init" ]


CMD [ "npm", "run","start:dev" ]