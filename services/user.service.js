const User = require('../models/user.model')

const updateUser = async (email, token) => {
    let newUser;
    try {
        newUser = await User.findOneAndUpdate({email}, {token})
    } catch (e) {
        console.log('Error: ', e)
    }
    return newUser;
}

const createUser = async (name, email, password, role, isEmailVerified, token='', phone, currentTime) => {
    const user = new User({name, email, password, role, isEmailVerified, token, phone, currentTime});
    try {
       await user.save()
    } catch (e) {
        console.log('Error when create user ', e)
    }
    return user;
}

const findUserByEmail = async (email) => {
    return User.findOne({email})
}


module.exports = {
    updateUser,
    createUser
}
