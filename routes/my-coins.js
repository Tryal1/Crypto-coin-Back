const {Router} = require('express')
const { check } = require('express-validator')
const { mycoinsGet,mycoinGet,myCoinsPost, myCoinsPut, myCoinsDelete } = require('../controllers/my-coins')
const { existeMiMoneda, existeMonedaUID } = require('../helpers/db-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()


router.get('/',mycoinsGet)

router.get('/:id',[
    // check('id','El id no es de mongo').isMongoId(),
    // check('id').custom(existeMiMoneda),
    // validarCampos
],mycoinGet)


router.post('/',[
    validarJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('coin','los valores son obligatorios').not().isEmpty(),
    validarCampos,
],myCoinsPost)

router.put('/:id',[
    validarJWT,
    check('id','El id no es de mongo').isMongoId(),
    // check('id').custom(existeMiMoneda),
    validarCampos
],myCoinsPut)


router.delete('/:id/:uid',[
    validarJWT,
    check('uid','no es un uid valido de mongo').isMongoId(),
    // check('uid').custom(existeMonedaUID),
    check('id','no es un id valido de mongo').isMongoId(),
    // check('id').custom(existeMiMoneda),
    validarCampos
],myCoinsDelete)

module.exports = router