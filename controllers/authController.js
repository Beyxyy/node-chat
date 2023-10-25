// Ajoutez des fonctions pour la gestion des utilisateurs,l'authentification, et l'inscription
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    pseudo: String,
    email: String,
    password: String,
    created_at: Date,
    updated_at: Date
});

UserSchema.pre('save', function(next){
    const user = this;
    const now = new Date();
    user.updated_at = now;
    if(!user.created_at){
        user.created_at = now;
    }
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err){

            return cb(err);
        }
        cb(null, isMatch);
    });
};
// module.exports = mongoose.model('User', UserSchema);
