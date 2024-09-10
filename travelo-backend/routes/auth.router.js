const { signup, login } = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../middleware/AuthValidation');

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/register', signupValidation, signup);

module.exports = router;