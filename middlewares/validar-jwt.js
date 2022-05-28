const { response } = require("express")
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuarios')

const validarJWT = async(req, res = response, next) => {
    //Obtiene el token del header
    const token = req.header('xtoken')

    //Verifica si hay token
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try{
        const {uid} = jwt.verify(token,process.env.SECRETPRIVATEKEY)
        
        //lee el usuario q corresponde al UID
        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - El usuario no existe'
            })
        }
        //verif si el uid es true
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado false'
            })
        }
        res.json(usuario);

        next()
    }catch(e){
        res.status(401).json({
            msg:'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}