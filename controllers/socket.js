
const User = require('../models/user');

const userConnected = async ( uid = '' ) => {

    const user = await User.findOneAndUpdate({ _id: uid }, { online: true }, { new: true });
    return user;

}

const userDisconnected = async ( uid = '' ) => {

    const user = await User.findOneAndUpdate({ _id: uid }, { online: false }, { new: true });
    return user;

}

module.exports = {
    userDisconnected,
    userConnected
}