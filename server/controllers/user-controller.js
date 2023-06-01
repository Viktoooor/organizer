const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {email, password} = req.body
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async checkPassword(req, res, next){
        try {
            await userService.checkPassword(req.params.id, req.body.data)
            return res.json(true)
        } catch (e) {
            next(e)
        }
    }

    async changePassword(req, res){
        try {
            await userService.changePassword(req.params.id, req.body.data)
            return res.json(true)
        } catch (e) {
            return res.status(500).json("Unexpected error")
        }
    }

    async changeInfo(req,res){
        try {
            const userData = userService.changeInfo(req.params.id, req.body)
            return res.json(userData)
        } catch (e) {
            return res.status(500).json("Unexpected error")
        }
    }
    async changePicture(req, res){
        try {
            const response = await userService.changePicture(req.files.picture, req.params.id)
            return res.json(response)
        } catch (e) {
            return res.json("Unexpected error")
        }
    }

    async forgotPassword(req, res, next){
        try {
            await userService.forgotPassword(req.params.email)
            return res.json(true)
        } catch (e) {
            next(e)
        }
    }

    async checkCode(req, res, next){
        try {
            await userService.checkCode(req.params.email, req.body.data)
            return res.json(true)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = await req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}


module.exports = new UserController();
