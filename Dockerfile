FROM node:8

ENV user node

# Create app directory
RUN mkdir -p /$user/src/app
WORKDIR /$user/src/app

# Install app dependencies
COPY package.json /$user/src/app/
COPY npm-shrinkwrap.json /$user/src/app/
RUN npm install

# Bundle app source
COPY . /$user/src/app

RUN chown -R $user:$user /$user/src/app/
USER $user
