# Use official Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

ENV NPM_CONFIG_LOGLEVEL=error

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy backend source code
COPY ./src ./src


# Expose port
EXPOSE 5000

# Start the backend
CMD ["node", "src/index.js"]

