# Use a lightweight Node 22 image.
FROM node:22-alpine

# Create and set working directory.
WORKDIR /app

# Copy package files and install dependencies.
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the code.
COPY . .

# Default command to run the application.
CMD ["npm", "start"]
