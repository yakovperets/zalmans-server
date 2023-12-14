FROM node:21-alpine3.17 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -D typescript
COPY ./src ./src
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm run build
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm install
EXPOSE 4000
CMD ["npm", "start"]