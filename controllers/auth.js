const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/generar-JWT.js');
// const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res)=>{
    const {email, password} = req.body

    try {
        const usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        const token = await generarJWT(usuario.id)

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    login
}