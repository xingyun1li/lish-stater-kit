FROM node:8.16.0-alpine

# Copy application files
COPY ./build /usr/src/app
WORKDIR /usr/src/app

# Install Yarn and Node.js dependencies
RUN npm install yarn --global --no-progress --silent --depth 0 && \
    yarn install --production --no-progress --registry https://registry.npm.taobao.org/

CMD [ "node", "server.js" ]