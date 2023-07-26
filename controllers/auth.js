const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response ) => {

    const { email, password } = req.body;

    try {

        const exists = await User.findOne({ email });
        if( exists ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already used'
            });
        }

        const user = new User( req.body );

        // Encript password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        // Generar mi JWT
        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            user,
            token
        });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Contact with the server administrator'
        });
    }
}

const login = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const userDB = await User.findOne({ email });
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        // Validate password
        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password'
            });
        }


        // Generate JWT
        const token = await generateJWT( userDB.id );
        
        res.json({
            ok: true,
            user: userDB,
            token
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contact with the server administrator'
        })
    }

}


const renewToken = async( req, res = response) => {

    const uid = req.uid;

    // generate new JWT, generateJWT... uid...
    const token = await generateJWT( uid );

    // Get user by UID, user.findById... 
    const user = await User.findById( uid );

    res.json({
        ok: true,
        user,
        token
    });

}

module.exports = {
    createUser,
    login,
    renewToken
}
