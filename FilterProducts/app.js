require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('express-async-errors')

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./docs/swagger.json");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users.route');
let productsRouter = require('./routes/products.route')
let ordersRouter = require('./routes/orders.route')

const { sequelize } = require('./models/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// sequelize.sync({  
//   force:true
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/products/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', indexRouter);
app.use('/products', productsRouter);

// error handler
app.use((err, req, res, next) => {
    
    res.status(400);
    res.json({ error: err.message });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
