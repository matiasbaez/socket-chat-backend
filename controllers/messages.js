const { response } = require("express");

const Message = require('../models/message');

const getMessages = async (req, res = response) => {

    const userId = req.uid;
    const from = req.params.from;

    const page = Number(req.query.page) || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const messages = await Message.find({
        $or: [
            { from, to: userId },
            { from: userId, to: from }
        ]
    })
    .sort({ createdAt: -1 })
    .limit(perPage)
    .skip(skip);

    return res.json({
        ok: true,
        data: messages,
    });

}

module.exports = {
    getMessages
}