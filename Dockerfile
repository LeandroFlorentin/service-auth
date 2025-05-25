FROM node:22.16.0-alpine AS install-dependencies
WORKDIR /app
COPY package.json ./package.json
RUN npm install

FROM node:22.16.0-alpine AS build
WORKDIR /app
COPY --from=install-dependencies ./app/node_modules ./node_modules
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json
COPY src/ ./src
COPY index.ts ./index.ts
RUN npm run build

FROM node:22.16.0-alpine AS dependencies-production
WORKDIR /app
COPY package.json ./package.json
RUN npm install --prod

FROM node:22.16.0-alpine AS runner
COPY --from=dependencies-production ./app/node_modules ./node_modules
COPY --from=build ./app/dist/ ./dist
EXPOSE ${PORT}
CMD ["node","dist/index.js"]