let {UsersController} = require('../controllers/users.controller')
const {JoiValidator} = require('../middleware/validation')
// Modules
const express = require("express");
const router = express.Router();


router.post("/register",new JoiValidator(['name','email','password']), UsersController.register);
router.post("/login",new JoiValidator(['email','password']), UsersController.login);


module.exports = router;