const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const ObjectController = require('../controllers/object-controller')

//Objects
router.post('/objects/:id', ObjectController.create)
router.get('/objects/:id', ObjectController.getAll)
router.put('/objects/:id', ObjectController.update)

//Users
router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

router.post('/checkPassword/:id', userController.checkPassword)
router.post('/changePassword/:id', userController.changePassword)
router.post('/changeInfo/:id', userController.changeInfo)
router.post('/changePicture/:id', userController.changePicture)

router.get('/forgotPassword/:email', userController.forgotPassword)
router.post('/checkCode/:email', userController.checkCode)
router.get('/activate/:link', userController.activate);

router.get('/refresh', userController.refresh)

module.exports = router