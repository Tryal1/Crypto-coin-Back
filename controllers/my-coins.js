const MyCoins = require('../models/my-coins')

const mycoinsGet = async (req,res) =>{

    const [total, coins] = await Promise.all([
        MyCoins.countDocuments(),
        MyCoins.find()
        .populate('usuario','name')
    ])
    res.json({
        total,
        coins,
    })

}

const mycoinGet = async (req,res) =>{
   const {id} = req.params
   const coin = await MyCoins.find({id})
   console.log(coin)
   res.json(coin)

}


const myCoinsPost = async (req,res)=>{
    const {name,coin} = req.body

    const existe = await MyCoins.findOne({name})
    
    if(existe){
        const update = await MyCoins.findOneAndUpdate({name},{$push:{coin:coin}})
        console.log(update)
        res.json(update)
    }else{
        const data = {
            name,
            coin,
            usuario: req.usuario._id
        }
        const mycoins = await MyCoins(data)
        await mycoins.save()
        res.json(mycoins)
    }
    
}

const myCoinsPut = async (req,res)=>{
    const {id,uid} = req.params
    const {_id,name, ...rest} = req.body

    const coin = await MyCoins.findByIdAndUpdate(id,rest)
    res.json(coin)
}

const myCoinsDelete = async (req,res)=>{
    const {id} = req.params
    const coin = await MyCoins.findByIdAndDelete(id)
    res.json(coin)
}

module.exports = {
    mycoinsGet,
    mycoinGet,
    myCoinsPost,
    myCoinsPut,
    myCoinsDelete
}