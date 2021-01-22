# Pull node image from docker hub
FROM node:10-alpine

#making sure that container isn't running as root
RUN addgroup  nodejs && adduser   -S -s  /bin/bash -g  nodejs nodejs
RUN chown nodejs:nodejs  /var/
USER nodejs

# Set working directory
RUN mkdir -p /var/www/ecommerceFilter
WORKDIR /var/www/ecommerceFilter

# Copy existing application directory contents
COPY . /var/www/ecommerceFilter
# install all dependencies
RUN npm cache clean --force
RUN npm install

EXPOSE 8080
CMD [ "npm", "run", "start" ]