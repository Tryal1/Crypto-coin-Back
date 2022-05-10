const {Schema , model} = require('mongoose')

const  UsuarioSchema = Schema({
    name:{
        type:String,
        require:[true,'El nombre es obligatorio'],
    },
    email:{
        type:String,
        require:[true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'El password es obligatorio'],
    },
    rol:{
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false,
    },

})

//No muestra la contra que se muestra en el JSON
UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id, ...user} = this.toObject();
    user.uid = _id
    return user
}

module.exports = model('Usuarios' , UsuarioSchema);