FROM node:22

WORKDIR /service-auth

COPY . .

RUN npm install

ARG PORT=3000

ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["npm","run","dev"]