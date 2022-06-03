const bcrypt = require('bcryptjs/dist/bcrypt')
const Usuario = require('../models/usuarios')


const usuairosGet = async (req,res)=>{
    const {offset = 0,limit = 5} = req.query

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .limit(limit)
        .skip(offset)
    ])

    res.status(400).json({
        total,
        usuarios,
    })
}

const usuairoGet = async (req,res)=>{
    const {id} = req.params
    const usuario = await Usuario.findById(id)
    res.status(400).json(usuario)
}


const usuarioPost = async (req, res)=>{

    const {name,email,password,rol='USER_ROLE'} = req.body
    //guardamos el usuairos
    const usuario = new Usuario({name,email,password,rol})
    //encriptar contrasena def 10
    const vueltas = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(password , vueltas)

    await usuario.save()


    res.json({
        usuario
    })

}

const usuarioPut = async(req,res)=>{
    const {id} = req.params
    //id pass google y email no se pueden cambiar
    const {_id,password, google,email, ...resto} = req.body
    if(password){
        const salt = bcrypt.genSaltSync()
        resto.password = bcrypt.hashSync(password , salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    res.json(usuario)
}

const usuarioDelete = async(req,res)=>{
    const {id} = req.params

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

    res.json(usuario)
}

module.exports ={
    usuairosGet,
    usuairoGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
}