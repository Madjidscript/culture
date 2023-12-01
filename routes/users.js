var express = require('express');
const controllerUser = require('../controller/controllerUser');
const Midtoken = require('../middlewares/token');
var router = express.Router();


/* GET users listing. */
router.get('/', controllerUser.inscription);
router.post('/', controllerUser.inscriptionPost);
router.get('/connexion', controllerUser.connexion);
router.post('/connexion', controllerUser.connexionPost);
router.get('/deconnexion', controllerUser.deconnexion);
router.get('/index2',Midtoken.authToken, controllerUser.index2);

module.exports = router;
