# Use the official Node.js image as the base image
FROM node:16.14.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the entire Strapi application to the container
COPY . .

# Expose the default Strapi port (change if needed)
EXPOSE 1337

# Set the environment variable for the Strapi app
ENV NODE_ENV production

# Build the Strapi admin panel
RUN npm run build

# Start the Strapi server
CMD ["npm", "start"]