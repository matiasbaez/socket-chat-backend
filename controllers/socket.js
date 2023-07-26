
const User = require('../models/user');
const Message = require('../models/message');

const userConnected = async ( uid = '' ) => {

    const user = await User.findOneAndUpdate({ _id: uid }, { online: true }, { new: true });
    return user;

}

const userDisconnected = async ( uid = '' ) => {

    const user = await User.findOneAndUpdate({ _id: uid }, { online: false }, { new: true });
    return user;

}
/* payload = {
    from: '',
    to: '',
    message: ''
} */
const saveMessage = async ( payload ) => {

    try {

        const message = Message(payload);
        await message.save();
        return true;

    } catch(error) {
        return false;
    }

}

module.exports = {
    userDisconnected,
    userConnected,
    saveMessage
}