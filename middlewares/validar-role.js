

const tieneRole = (...rols) =>{
    return(req, res = response, next)=>{

        // if(!req.usuario){
        //     return res.status(500).json({
        //         msg:"Se verifica el rol sin verificar el token"
        //     })
        // }
        if(!req.inclides(req.usuario.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${rols}`
            })
        }
       

        next()
    }
}

module.exports={
    tieneRole
}