FROM node:20
WORKDIR /app
copy . .
RUN npm install
CMD npx knex migrate:latest && npx knex seed:run && npm start