let UsersService = require('../services/users.service')

class UsersController {
    static async register(req, res) {
        try{
            let data = await UsersService.register(req.body);
            return res.header('x-auth-token', data.token).status(data.code).send(data.message)
        }catch(err){
            res.status(err.code).send(err.message)
        }
    }

    static async login(req, res) {
        try{
            let data = await UsersService.login(req.body);
            return res.header('x-auth-token', data.token).status(data.code).send(data.message)
        }catch(err){
            res.status(err.code).send(err.message)
        }
    }
}

module.exports = UsersController