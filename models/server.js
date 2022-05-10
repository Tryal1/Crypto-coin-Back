const express = require('express')
const cors = require('cors');
const { DB } = require('../db/congif');

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/auth',
            favoritos:'/favoritos',
            myCoins: '/mycoins',
            usuarios:'/usuarios',
        }

        this.conectarDB()
        this.middlewares()
        this.routes();
        this.listen()
    }

    async conectarDB(){
        await DB()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.favoritos, require('../routes/favoritos'))
        this.app.use(this.paths.myCoins, require('../routes/my-coins'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Listen in port ',this.port)
        })
    }

}

module.exports = Server
