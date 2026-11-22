FROM node:22-alpine AS build

WORKDIR /app

ARG VITE_API_URL=http://localhost:8080/api/v1
ENV VITE_BASE_PATH=/
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN echo "server { \
    listen 80; \
    include /etc/nginx/mime.types; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]