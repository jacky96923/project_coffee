FROM node:20
WORKDIR /app
copy ./build/. .
RUN npm install
CMD npx knex migrate:latest && npx knex seed:run && npm run dstart