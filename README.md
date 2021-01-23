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
- please update your ~/.profile with env variables or pass it to docker compose file at Deployment directory with your database credentials and database name should be the same with the one in the sql script
- please find DDL script at './Deployment/ecommercStructreData.sql'
- docker compose populate databse with data by ecommercStructreData.sql
- 
- i have attached postman collection for APIs
- move to Deployment Directory
```bash
# build docker image for the app
$ docker-compose build
$ docker pull mysql:latest
$ docker-compose up

# development mode
$ npm install
$ npm start
```
- visit [users Api Docs](http://localhost:8080/users/api-docs/) to find users Api Docs.
- visit [products Api Docs](http://localhost:8080/products/api-docs/) to find Products Api Docs.
- visit [orders Api Docs](http://localhost:8080/orders/api-docs/) to find orders Api Docs.


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