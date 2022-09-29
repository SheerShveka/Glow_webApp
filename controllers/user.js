const bcrypt = require('bcrypt');
const path = require('path');

const User = require('../models/user');

exports.login = async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
        const valid = await user.validatePassword(req.body.password);
        if (valid) {
            return res.status(200).json({
                success: true,
                msg: "valid"
            });
        }
        else {
            return res.status(400).json({
                success: false,
                msg: "error"
            });
        }
    }
    else {
        return res.status(400).json({
            success: false,
            msg: "error"
        });
    }
}

exports.register = async (req, res, next) => {
    let user = await User.create(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    return res.status(201).json({
        success: true,
        data: user
    });
}