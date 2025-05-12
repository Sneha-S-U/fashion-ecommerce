# Step 1: Use Node image to build the React app
FROM node:16 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Install missing dependencies to fix crypto error
RUN apt-get update && apt-get install -y libssl-dev

# Step 4: Copy the rest of the app and build it
COPY . ./
RUN npm run dev

# Step 5: Use Nginx to serve the static files
FROM nginx:alpine

# Step 6: Copy build folder to Nginx's default static folder
COPY --from=build /app/build /usr/share/nginx/html

# Step 7: Expose port 80 (default HTTP port)
EXPOSE 80

# Step 8: Run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]

