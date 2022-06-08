const Favorito = require("../models/favorito")
const MyCoins = require("../models/my-coins")
const Usuarios = require("../models/usuarios")

const validarEmail = async (email = '') =>{
    const existe = await Usuarios.findOne({email})
    if(existe){
        throw new Error(`El correo ${email} ya existe`)
    }
}

const existeUsuarioId = async (id)=>{
    const existe = await Usuarios.findById(id)
    if(!existe){
        throw new Error(`El usuario con el id ${id} no existe`)
    }
}

const validarRol = async(rol)=>{
    const existeRol = await Usuarios.find(rol)
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado`)
    };
}

const existeMoneda = async(id) =>{
    const existe = await Favorito.findById(id)
    if(!existe){
        throw new Error(`La moneda con el id ${id} no existe`)
    }
}

const existeMiMoneda = async (id)=>{
    const existe = await MyCoins.findById(id)
    if(!existe){
        throw new Error(`La moneda con el id ${id} no existe`)
    }
}

const existeMonedaUID = async(id)=>{
    console.log(id)
    const existe = await MyCoins.findById({_id:'627b21de82fcc747adf87c24'},
    { coin: 
        { $elemMatch : 
           { 
             _id: id
           } 
        } 
    })
    if(existe.coin.length === 0){
        throw new Error(`La moneda con el id ${id} no existe`)
    }
    
}

module.exports ={
    validarEmail,
    existeUsuarioId,
    validarRol,
    existeMoneda,
    existeMiMoneda,
    existeMonedaUID
}