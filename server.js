const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/mongodb')



// routes
const authenticateRoutes = require('./api/routes/authenticate.route')
const trellocardRoutes = require('./api/routes/trellocard.route')


dotenv.config({ path: './config/config.env' });

const app = express();

// corsconfiguration
app.use(cors({ credentials: true, origin: process.env.CORSORIGIN }));

// dbconnect
connectDB();

// session creation
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// auth session check middleware
const auth = (req, res, next) => {
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
    return res.json({ _id: req.session.idMember, ...JSON.parse(req.session.memberInfo) })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server running in dev env"));