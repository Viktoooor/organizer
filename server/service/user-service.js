const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');
const userModel = require('../models/user-model');
const fileService = require('./file-service')

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`User with this email address already exists`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()

        const user = await UserModel.create({email, password: hashPassword, activationLink, picture: "default.jpg"})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Incorrect activation link')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('User with this email was not found')
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password')
        }
        const userDto = new UserDto(user)
        if(userDto.isActivated === false){
            throw ApiError.BadRequest('Activate your account')
        }
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async checkPassword(id, password){
        const user = await UserModel.findById(id)
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.BadRequest("Invalid password")
        }
        return user
    }

    async changePassword(id, password){
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.findByIdAndUpdate(id, {password: hashPassword})
        return user
    }

    async changeInfo(id, body){
        const user = await UserModel.findOneAndUpdate({email: id}, body)
        const userDto = new UserDto(user)
        return { user: userDto }
    }

    async changePicture(picture, id){
        const fileName = fileService.saveFile(picture)
        const user = await UserModel.findByIdAndUpdate(id, {picture: fileName})
        return user
    }

    async forgotPassword(email){
        const user = await UserModel.findOne({email: email})
        if(!user){
            throw ApiError.BadRequest('User with this email was not found')
        }
        const code = Math.floor(100000 + Math.random() * 900000)
        await UserModel.findOneAndUpdate({email: email}, {code: code})
        await mailService.sendCodeMail(email, code)
    }

    async checkCode(email, code){
        const user = await UserModel.findOne({email: email})
        if(user.code != code){
            throw ApiError.BadRequest("Invalid code")
        }
        const tempPassword = uuid.v4()
        const tempPassHash = await bcrypt.hash(tempPassword, 3)
        await UserModel.findOneAndUpdate({email: email}, {password: tempPassHash})
        await mailService.sendTempPass(email, tempPassword)
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService();
