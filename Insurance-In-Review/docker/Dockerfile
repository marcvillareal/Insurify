# Use Node.js as base image
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Stage 2: Serve the production build with Nginx
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Copy the built files to Nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the favicon to the Nginx HTML directory
COPY --from=builder /app/src/assets/images/general/InsurifyLogo.png /usr/share/nginx/html/assets/

# Expose port
EXPOSE 5173

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
