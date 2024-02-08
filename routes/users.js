var express = require('express');
var router = express.Router();
const  { registerUser,loginUser,currentUser }  = require('../controller/user.controller');
const validateToken = require('../middleware/verifyToken');

/* Register users listing. */
router.post('/register',registerUser);

/* Login users listing. */
router.post('/login',loginUser);

/* Current users listing. */
router.get('/current',validateToken,currentUser);

module.exports = router;