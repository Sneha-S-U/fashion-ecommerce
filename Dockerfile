# Use an official Node.js image as the base
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if using npm) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Vite uses for development
EXPOSE 3000

# Run the Vite development server
CMD ["npm", "run", "dev"]
