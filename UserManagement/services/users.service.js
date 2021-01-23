const User = require("../models/index")["User"];
const {
  hash,
  validatePass
} = require("../middleware/hashing")
const {
  createToken
} = require('../middleware/authintication')
const errors = require('../errors/businessErrors')
const BusinessError = require('../middleware/businessError')

class UsersService {
  static async register(body) {
    let user = await User.findOne({
      where: {
        email: body.email
      }
    });
    if (user) throw new BusinessError(errors.USER_REGISTERED)

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
    if (!user) throw new BusinessError(errors.INVALID_CREDENTIALS)

    let validPassword = await validatePass(body.password, user.password)
    if (!validPassword) throw new BusinessError(errors.INVALID_CREDENTIALS)

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