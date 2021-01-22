const {
  sequelize
} = require("../models/index");
const User = require("../models/index")["User"];
const {
  hash,
  validatePass
} = require("../middleware/hashing")
const {
  createToken
} = require('../middleware/authintication')

class UsersService {
  static async register(body) {
    let user = await User.findOne({
      where: {
        email: body.email
      }
    });
    if (user) return {
      code: 400,
      message: "user is already registered"
    };

    body.password = await hash(body.password)
    user = await new User(body).save();

    let token = createToken({
      email: user.email,
      id: user.id
    })
    return {
      code: 200,
      message: user,
      token: token
    }
  }


  static async login(body) {


    let user = await User.findOne({
      where: {
        email: body.email
      }
    });

    if (!user) return {
      code: 400,
      message: "email or password is incorrect"
    }

    let validPassword = await validatePass(body.password, user.password)
    if (!validPassword) return {
      code: 400,
      message: "email or password is incorrect"
    }

    let token = createToken({
      email: user.email,
      id: user.id
    })
    return {
      code: 200,
      message: user,
      token: token
    }

  }
}

module.exports = UsersService