const Room = require('../models/roomModel.js');
const Message = require('../models/messageModel.js');


exports.chatView =async (req, res) => {
    console.log(req.user);
    const Rooms = await Room.find().exec();
    console.log(Rooms);
    res.render('../views/chat.ejs', {
        rooms : Rooms,
    });
}


exports.roomCreate = (req, res) => {
    //vérification l'utilisateur est connecté avec passport
    if (!req.user) {
        res.redirect('/login');
    }else{
        if(!Room.findOne({name: req.body.name})){
        Room.create({
            owner: req.user,
            name : req.body.name
        }).then((room) => {
                console.log(room);
                res.redirect('/chat');
            
        }).catch((err) => {
            console.log(err);
            res.redirect('/room/create');
        });
        }else{
            res.render('../views/createRoom.ejs', {
                message : 'Room already exist',
            });
        }
    }
}

exports.roomCreateView = (req, res) => {
    res.render('../views/createRoom.ejs', {
        message : '',
    });
}

exports.roomView = async  (req, res) => {
    if(req.user){
        // console.log(req.params.id);
        const room = await Room.findOne({_id: req.params.id});
        if(room != null){
            const messages = await Message.find({room: req.params.id});
            res.render('../views/roomView.ejs', {
                room : room,
                messages : messages || [],
            });
        }else{
            res.redirect('/chat');
        }
       
    }
    else{
        res.redirect('/login');
    }
        
}


