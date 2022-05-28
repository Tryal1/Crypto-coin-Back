const { Router } = require('express')
const {check} = require('express-validator')
const { usuarioPost, usuairosGet, usuairoGet, usuarioPut, usuarioDelete} = require('../controllers/usuarios')
const { validarEmail, existeUsuarioId, validarRol } = require('../helpers/db-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { tieneRole } = require('../middlewares/validar-role')

const routes = Router()

//Obtener 
//todos
routes.get('/',validarJWT)
//1
routes.get('/:id',[
    check('id','no es un id valido de mongo').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],usuairoGet)

//Actualizar
routes.put('/:id',[
    check('id','no es un id valido de mongo').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('rol').custom(validarRol),
    validarCampos,
],usuarioPut)

//Crear
routes.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria y debe tener al menos 6 caracteres').isLength({min:6}),
    check('email','El correo no es valido').isEmail(),
    check('email').custom(validarEmail),
    validarCampos
],usuarioPost)


//Borrar
routes.delete('/:id',[

    check('rol').custom(validarRol),
    check('id','no es un id valido de mongo').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],usuarioDelete)



module.exports = routes