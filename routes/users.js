var express = require('express');
const controllerUser = require('../controller/controllerUser');
var router = express.Router();

/* GET users listing. */
router.get('/inscription', controllerUser.inscription);
router.post('/inscription', controllerUser.inscriptionPost);
router.get('/connexion', controllerUser.connexion);
router.post('/connexion', controllerUser.connexionPost);

module.exports = router;
