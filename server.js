const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const sequelizeStore = require('connect-session-sequelize');
const path = require('path');
const { sessionUser } = require('./middleware/session.js');
const {addLike, getLike} = require('./Controller/like.controller.js');
const { Profile, Login, LogOut } = require('./Controller/auth.controller.js');
const { 
  getAllContent,
  getContentById,
  createNewPosting,
  getHotPost,
  deletePosting,
  updateLike,
  getPostUser,
  getAllPostUserById,
} = require('./Controller/posting.controller.js');
const { getNotifications } = require('./Controller/notif.controller.js');
const { getUsers, createUser, updateUser, verifyUser, resendCode, getEmail, changePassword, deleteUser, getUserId } = require('./Controller/user.controller.js');
const { searchTerm } = require('./Controller/search.controller.js');
const { followUser, getFollowers } = require('./Controller/follows.controller.js');
const { getComments, uploadComment } = require('./Controller/comment.controller.js');
const { sendReport, getReport } = require('./Controller/bugreport.controller.js');
const { sendReportPost } = require('./Controller/reportposting.controller');
const {
  getBgUser,
  getBackgroundUserById,
  updateBackgroundUser,
} = require('./Controller/backgroundHandler.controller.js');
const { 
  getRandom,
  postPhoto
} = require('./Controller/randomPhoto.controller.js');
const db = require('./Config/database.js');
const session = require('express-session');
require('dotenv').config();

const app = express();
const sessionStore = new (sequelizeStore(session.Store))({ db: db });

// async function startDB(){await db.sync();};startDB();

app.use(session({ 
    secret: process.env.SESS,
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      secure: "auto",
    },  
    proxy: true,
  })
);

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));
app.use(fileUpload());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  return res.status(200).json({status: 200, msg: "server is running"});
})

app.get('/like/:postId', sessionUser, getLike);
app.post('/like', sessionUser, addLike);
app.get('/auth/profile', Profile);
app.post('/auth/login', Login);
app.delete('/auth/logOut', LogOut);
app.get('/posting/all_content', sessionUser , getAllContent);
app.get('/posting/user', sessionUser , getPostUser);
app.get('/posting/:id/user', sessionUser , getAllPostUserById)
app.get('/:id/posting', sessionUser , getContentById);
app.post('/posting/new_content' , sessionUser, createNewPosting);
app.patch('/posting/like/:postId', sessionUser , updateLike);
app.get('/posting/get/hot_postings', sessionUser, getHotPost);
app.delete('/posting/:postId', sessionUser, deletePosting);
app.get('/notif/get_all', sessionUser, getNotifications);
app.get('/users/random', sessionUser, getUsers);
app.get('/get/user/:uuid', sessionUser, getUserId);
app.post('/user/create', createUser);
app.patch('/forgot-pass/get_email', getEmail)
app.patch('/update-pass/:userId/:token', changePassword);
app.patch('/user/verify', verifyUser);
app.patch('/user/resend/otp', resendCode);
app.patch('/user/edit', sessionUser, updateUser);
app.delete('/delete/user', sessionUser, deleteUser);
app.get('/user/search', sessionUser, searchTerm);
app.get('/get_followers/', sessionUser, getFollowers);
app.post('/follow/:id/user/', sessionUser, followUser);
app.get('/posting/:id/all_comment', sessionUser, getComments);
app.post('/posting/:id/comment', sessionUser , uploadComment);
app.get('/bugreport/get_report', sessionUser, getReport)
app.post('/bugreport', sessionUser,sendReport);
app.post('/report/:postId/posting', sessionUser, sendReportPost);
app.get('/background/user', sessionUser, getBgUser);
app.get('/background/:userId/user', sessionUser, getBackgroundUserById);
app.patch('/background/user/update', sessionUser, updateBackgroundUser);
app.get('/random_photo', getRandom);
app.post('/random_photo/upload', postPhoto);

app.listen(process.env.PORT, () => {
  console.log(`listening on port http://localhost:${process.env.PORT}`);
});

module.exports = app; 