let {
    UsersService
} = require('../services/users.service')

module.exports.UsersController = class {
    static async register(req, res) {

        let data = await UsersService.register(req.body);
        if (data.code == 200) {
            return res.header('x-auth-token', data.token).status(data.code).send(data.message)
        } else {
            res.status(data.code).send(data.message)
        }
    }

    static async login(req, res) {

        let data = await UsersService.login(req.body);
        if (data.code == 200) {
            return res.header('x-auth-token', data.token).status(data.code).send(data.message)
        } else {
            res.status(data.code).send(data.message)
        }
    }
}