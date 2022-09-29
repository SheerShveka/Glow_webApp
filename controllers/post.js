// JavaScript source code
const path = require('path');
const Post = require('../models/post');

exports.newPost = async (req, res, next) => {
    let post = await Post.create(req.body);

    return res.status(201).json({
        success: true,
        data: post
    });
}
