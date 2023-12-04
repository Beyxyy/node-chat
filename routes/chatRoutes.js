const chatController = require ('../controllers/chatController.js');
const protect = require("../auth/protect.js");

app.get('/chat', protect.protectRoute, chatController.chatView);
app.get('/room/create', protect.protectRoute, chatController.roomCreateView);
app.post('/room/create', protect.protectRoute, chatController.roomCreate);
app.get('/room/:id', protect.protectRoute, chatController.roomView);