const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/mongodb')
const createMember = require('./api/controller/trelloauth.controller')
const { getCardsofboardController, getCardController, createCardController, updateCardController, deleteCardController } = require('./api/controller/card.controller')



// routes
const authenticateRoutes = require('./api/routes/authenticate.route')
const trellocardRoutes = require('./api/routes/trellocard.route')


dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cors({ credentials: true , origin: 'http://localhost:4200'}));

// dbconnect
connectDB();

// session creation
app.use(session({
    secret: 'abdsasdfdsf',
    resave: false,
    saveUninitialized: true
}));


const auth = (req, res, next) => {
    console.log(" sana", req.session.idMember)
    if (req.session && req.session.idMember)
        return next();
    else
        return res.sendStatus(401);
};

app.use(express.json());
app.use(express.urlencoded());

// mount routes
app.use("/api/v1/authenticate", authenticateRoutes);
app.use("/api/v1/card", auth, trellocardRoutes);


app.get('/api/v1/member', auth, (req, res) => {
    return res.json({ _id: req.session.idMember })
})


// app.get('/login', (req, res) => {
//     req.session.idMember = "647a8031ad313b4ba80e50e7";
//     req.session.idBoard = "647ac9a8fa422bad0b47dcd9";
//     // createMember(req, res)
//     res.json({ name: "Sana" })
// })



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server running in dev env"));