const {UserService} = require('../services');

const deleteUser = async (req, res ) =>  {
    const {email} = req.body;
    if (!email) return res.sendStatus(404)
    const user = UserService.deleteUser(email);
    if (!user) return res.sendStatus(403);
    return res.status(200).send(user);
}

const getUserDetail = async (req, res) => {
    const {user} = req;
    if (user) {
       const found = await UserService.findUserByEmail(user.email);
       if (!found) return res.sendStatus(404);
       return res.json(found);
    }
    return res.sendStatus(403);
}

const getUsers = async (req, res) => {
    const users = await UserService.getAllUser();
    if (!users) return res.sendStatus(404);
    return res.status(200).json(users);
}

module.exports = {
    deleteUser,
    getUserDetail,
    getUsers
}
