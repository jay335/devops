# Build stage
FROM node:18 as build

WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL=error

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

