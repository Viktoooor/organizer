module.exports = class UserDto {
    email
    id
    isActivated
    dateOfBirth
    userName
    sex
    picture
    bio

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isActivated = model.isActivated
        this.dateOfBirth = model.dateOfBirth
        this.userName = model.userName
        this.sex = model.sex
        this.picture = model.picture
        this.bio = model.bio
    }
}
