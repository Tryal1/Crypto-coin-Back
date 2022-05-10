const Favoritos = require('../models/favorito')

const favoritosGet = async (req,res)=>{
    const [total, coins] = await Promise.all([
        Favoritos.countDocuments(),
        Favoritos.find()
        .populate('usuario','name')
    ])
    res.json({
        total,
        coins,
    })
}

const favoritoGet = async (req,res)=>{
    const {id} = req.params
    const coin = await Favoritos.findById(id)
    res.json(coin)
}

const favoritoPost = async (req, res)=>{
    const {name} = req.body
    const data = {
        name,
        usuario: req.usuario._id
    }
    const coin = new Favoritos(data)
    await coin.save()
    res.json({
        coin
    })

}

const favoritoDelete = async(req,res)=>{
    const {id} = req.params

    const favoritos = await Favoritos.findByIdAndDelete(id)

    res.json(favoritos)
}

module.exports ={
    favoritosGet,
    favoritoGet,
    favoritoPost,
    favoritoDelete
}