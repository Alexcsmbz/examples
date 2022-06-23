#### STAGE 1: Build ####
FROM node:gallium-alpine AS build

EXPOSE 80

ENV PORT 80
ENV HOST 0.0.0.0
RUN apk add git
WORKDIR /code
COPY . .
RUN yarn && \
    yarn build:dev
#### STAGE 2: Run ####
FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /code/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
