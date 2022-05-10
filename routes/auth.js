const { Router } = require('express')
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()

router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password','la contraseña es obligatorio').not().isEmpty(),
    validarCampos,
],login)


module.exports = router