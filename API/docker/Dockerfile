# Get a base image
FROM golang:1.20-alpine

# Set the working directory inside the container
WORKDIR /API

# Copy the contents of the cmd folder into the container's working directory
COPY . .

# Copy the .env file into the container
COPY cmd/.env .

# Run commands to fetch dependencies and build the Go application
RUN go get -d -v ./...
RUN go build -o app ./cmd

# Expose the port the application runs on
EXPOSE 8080

# Expose the port the application runs on
EXPOSE 27017

# Command to run the application
CMD ["./app"]
