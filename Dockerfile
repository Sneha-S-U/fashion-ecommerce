# Stage 1: Build the app
FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve the built app
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
