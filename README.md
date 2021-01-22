## Description
Node.js simple app with validation and pagination middlewares using Sequelize ORM and Express framework and  as a proof of concept.
### Prerequisites  
  
-  Node v12 LTS
-  MYSQL
-  Postman
  ### Languages, libraries and tools used
-   [Node.js](https://nodejs.org/en/)
-   [Sequelize ORM](https://sequelize.org/)
-   [Docker](https://www.docker.com/)
-   [Swagger API](https://swagger.io/)

## Running the app
- please update .env file at root directory with your database credentials and database name should be the same with the one in the sql script
- please find DDL script at './DDL Structure.sql'
- please find DDL script with dumb data for testing at './DDL StructureData.sql'
- i have attached postman collection for APIs

```bash
# build docker image for the app
$ docker build -t mokhaled3003/ecommerce .
$ docker pull mysql:latest
$ docker-compose up

# development mode
$ npm install
$ npm start
```
- visit [ecommerce App Api Docs](http://localhost:3000/api-docs/) to find Products Api Docs.

## Support

- now the container won't run as root user
```javascript
//making sure that container isn't running as root
 RUN addgroup  nodejs && adduser   -S -s  /bin/bash -g  nodejs nodejs
 RUN chown nodejs:nodejs  /var/
 USER nodejs
```
## Stay in touch

- Author - [Mohamad Khaled](https://www.linkedin.com/in/engmokhaled/)