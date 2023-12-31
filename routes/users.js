/*
    path: api/users

*/
const { Router } = require('express');

const { getUsers } = require('../controllers/user');
const { validateJWT } = require('../middlewares/check-jwt');

const router = Router();

router.get('/', validateJWT, getUsers );

module.exports = router;
