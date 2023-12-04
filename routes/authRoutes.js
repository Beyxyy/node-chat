// systeme de route vers le controller authController et la fonction register
//importe express et express router

//importe le controller authController
const authController = require('../controllers/authController.js');
const passport = require('passport');
const PPRT = require("../auth/passport");
const protect = require("../auth/protect.js");


app.get('/', authController.LoginView);
app.get('/login', authController.LoginView);
app.get('/register', authController.RegisterView);
app.post('/register', authController.RegisterUser);
app.post('/login', authController.LoginUser);






