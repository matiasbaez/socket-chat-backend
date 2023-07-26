/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { checkFields } = require('../middlewares/check-fields');
const { validateJWT } = require('../middlewares/check-jwt');

const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    checkFields
], createUser );

router.post('/', [
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
], login );


router.post('/renew', validateJWT, renewToken );

module.exports = router;
