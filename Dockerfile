FROM node:16
WORKDIR	~/apps/biocluster
COPY package*.json ./

RUN npm	install

COPY . .

RUN npm run sass:build

EXPOSE 3000
CMD ["node", "src/index.js"]
