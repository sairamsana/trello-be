const express = require('express');
const path = require('path');
const router = express.Router();
const createMember = require('../controller/trelloauth.controller')

// redirect to trello auth url and get permissions and return a token
router.get('/', (req, res) => {
    res.redirect(`https://trello.com/1/authorize?return_url=${process.env.TRELLO_CALLBACK_URL}&expiration=never&scope=read,write,account&response_type=token&key=${process.env.TRELLO_APIKEY}&callback_method=fragment`);
})

// parse token return by trello auth api to call back url
router.get('/parsetoken', (req, res) => {
    res.sendFile(path.join("html/parseToken.html"), { root: __dirname });
})

// get member information on first call and redirect to frontend application 
router.post('/savetoken', (req, res) => {
    if (req.body.token != null) {
        createMember(req, res).then((status) => {
            console.log("1 ", status)
            if (status) {
                req.session.save(() => {
                    res.redirect(process.env.FRONTEND_REDIRECT_URL_SUCCESS);
                })
            } else {
                res.redirect(process.env.FRONTEND_REDIRECT_URL_FAIL);
            }
        }, (error) => {
            res.redirect(process.env.FRONTEND_REDIRECT_URL_FAIL);
        });
    } else {
        res.redirect(process.env.FRONTEND_REDIRECT_URL_FAIL);

    }
})

// logout user session 
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.json({ status: "success", message: "logout success!" });
});


module.exports = router;