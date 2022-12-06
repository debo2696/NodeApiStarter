const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();

const OpenAIController = require('../controller/OpenAIController');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.get('/', function(req, res){
    return res.send({response:'Accesing api / route '});
});
router.get('/gen_jwt', function(req, res){
    const options = {};
    const token = jwt.sign({user:'debo2696', user_id:1, role:'admin'}, process.env.JWT_TOKEN_SECRET, options);
    return res.send({jwt_token:token});
});

router.get('/list_models', AuthMiddleware.checkAuth, AuthMiddleware.checkRole(['admin']), OpenAIController.list_models);
router.get('/create_completion', OpenAIController.create_completion);

module.exports = router;