# Use a lightweight Node.js image
FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the code
COPY . .

# Expose the port (Back4app/Render will provide this via environment variable)
EXPOSE 8080

# Start the server
CMD [ "node", "index.js" ]
