FROM node:23.7.0-slim

# Install Python, build-essential, and other required dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm clean-install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
