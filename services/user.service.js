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

const deleteUser = async (email) => {
    const user = await User.findOneAndDelete({email});
    if (!user) return false
    return user;
}


const findUserByEmail = async (email) => {
    const user = await User.findOne({email}).select('-password').select('-token')
    if (!user) return false;
    return user
}

const getAllUser = async () => {
    const users = await User.find().select('-password').select('-token');
    if (!users) return false;
    return users;
}


module.exports = {
    updateUser,
    createUser,
    deleteUser,
    findUserByEmail,
    getAllUser
}
