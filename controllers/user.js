const { response } = require("express");

const User = require('../models/user');

const getUsers = async (req, res = response) => {

    const page = Number(req.query.page) || 1;
    const perPage = 10;
    const skip = (page - 1) * perPage;

    const users = await User.find()
        .sort({ online: 1 })
        .limit(perPage)
        .skip(skip);

    return res.json({
        ok: true,
        data: users,
    });

}

module.exports = {
    getUsers
}