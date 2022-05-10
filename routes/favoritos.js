const { Router } = require('express')
const {check} = require('express-validator')
const { favoritosGet, favoritoGet, favoritoPost, favoritoDelete } = require('../controllers/favoritos')
const { existeMoneda } = require('../helpers/db-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const routes = Router()

routes.get('/',favoritosGet)

routes.get('/:id',favoritoGet)

routes.post('/',[
    validarJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],favoritoPost)

routes.delete('/:id',[
    validarJWT, 
    check('id','No es n id de mongo Valido').isMongoId(),
    check('id').custom(existeMoneda),
    validarCampos,
],favoritoDelete)


module.exports = routes