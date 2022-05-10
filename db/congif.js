const mongoose = require('mongoose')

const DB = async ()=>{
    try{

        //conectamos con la DB, se le pasa la url y objetos
        await mongoose.connect(process.env.MONGO);

        console.log('Conecto')

    }catch(error){
        console.log('error')
    }
}

module.exports={
    DB,
}