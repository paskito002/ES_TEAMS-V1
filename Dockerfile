
FROM node:20-bullseye

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* .npmrc ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js", "--server"]
