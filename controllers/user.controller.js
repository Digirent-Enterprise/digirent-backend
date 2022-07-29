const {UserService} = require('../services');

const deleteUser = async (req, res ) =>  {
    const {email} = req.body;
    if (!email) return res.sendStatus(404)
    const user = UserService.deleteUser(email);
    if (!user) return res.sendStatus(403);
    return res.status(200).send(user);
}

module.exports = {
    deleteUser
}
