# Use a lightweight Node 22 image.
FROM node:22-alpine

# Create and set working directory.
WORKDIR /app

# Copy package files and install dependencies.
COPY package*.json ./
RUN npm install --production

# Copy the rest of the code.
COPY . .

# Use a non-root user in production if desired.
# EXPOSE is optional for CLI apps, but included for future expansion.
EXPOSE 3000

# Default command to run the application.
CMD ["npm", "start"]
