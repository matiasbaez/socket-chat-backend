const jwt = require('jsonwebtoken');


const generateJWT = ( uid ) => {
    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if ( err ) reject('No se pudo generar el JWT');
            else resolve( token );
        })

    });
}

const checkJWT = ( token = '' ) => {
    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        return { success: true, uid };

    } catch (error) {
        return { success: false, uid: null };
    }
}

module.exports = {
    generateJWT,
    checkJWT
}