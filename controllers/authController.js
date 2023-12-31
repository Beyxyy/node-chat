// Ajoutez des fonctions pour la gestion des utilisateurs,l'authentification, et l'inscription
var crypto = require('crypto');
const User = require('../models/user.js');
const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');
const { isSet } = require('util/types');


// affichage de la 
exports.LoginView = (req, res) => {
    res.render('../views/login.ejs', {

    });
};


// affichage de la vue register
exports.RegisterView = (req, res) => {
    res.render('../views/register.ejs', {

    });
  }

exports.RegisterUser = (req, res) => {
    const { pseudo, email, password, confirm } = req.body;
    if (!pseudo || !email || !password || !confirm) {
      console.log("Fill empty fields");
    }
    //Confirm Passwords
    if (password !== confirm) {
      console.log("Password must match");
    } else {
      //Validation
      User.findOne({ email: email }).then((user) => {
        if (user) {
          console.log("email exists");
          res.render("register", {
            pseudo,
            email,
            password,
            confirm,
          });
        } else {
          //Validation
          const newUser = new User({
            pseudo,
            email,
            password,
          });

          console.log(newUser.password);
          //Password Hashing
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(res.redirect("/login"))
                .catch((err) => console.log(err));
            })
          );
        }
      });
  };
}

exports.LoginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/chat',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}





// module.exports = {LoginUser, RegisterUser};




