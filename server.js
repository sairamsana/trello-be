const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/mongodb')
const createMember = require('./api/controller/trelloauth.controller')
// routes
const authenticateRoutes = require('./api/routes/authenticate.route')


dotenv.config({ path: './config/config.env' });

// dbconnect
connectDB();


const app = express();

app.use(express.json());
// app.use(express.urlencoded());
// app.use(cors());

// mount routes
app.use("/api/v1/authenticate",authenticateRoutes);

app.get('/', (req, res) => {
    createMember(req,res)
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server running in dev env"));