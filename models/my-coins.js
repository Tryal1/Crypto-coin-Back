const { Schema,model } = require("mongoose");

const MyCoins = Schema({
    name:{
        type:String,
        required:[true,'El nombre es obligatorio'],
    },
    coin:
        {
            amount:{
                type:Number,
                required:[true,'El precio es obligatorio']
            },
            price:{
                type:Number,
                required:[true,'El precio es obligatorio']
            }
        }
    ,
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
   
})

MyCoins.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'MyCoins', MyCoins );