const express = require('express');
const { newPost } = require('../controllers/post');

const {
    login,
    register,
} = require("../controllers/user");

const router = express.Router();

router
    .route('/login')
    .post(login)

router
    .route('/register')
    .post(register)

router
    .route('/newPost')
    .post(newPost)

module.exports = router;