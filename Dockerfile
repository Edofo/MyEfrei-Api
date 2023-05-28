# Use the official Node.js 14 base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install yarn

RUN npm install -g yarn

# Install the dependencies using Yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn prisma:generate

# Expose the port on which your application will run (replace 4000 with the appropriate port number)
EXPOSE 4000

# Start the application
CMD ["yarn", "start"]
