FROM node:16.0.0-alpine3.13
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN yarn
COPY . .
CMD ["npm", "start"]