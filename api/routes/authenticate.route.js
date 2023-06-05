const express = require('express');
const path = require('path');
const router = express.Router();
const createMember = require('../controller/trelloauth.controller')

router.get('/', (req, res) => {
    res.redirect('https://trello.com/1/authorize?return_url=http://localhost:5000/api/v1/authenticate/parsetoken&expiration=never&scope=read,write,account&response_type=token&key=9303bee3409b8c827da5aec23a86c644&callback_method=fragment');
})

router.get('/parsetoken', (req, res) => {

    res.sendFile(path.join("html/parseToken.html"), { root: __dirname });
})

router.post('/savetoken', (req, res) => {
    console.log("req sabna", req.body.token);
    if (req.body.token != null) {
        createMember(req, res).then((status) => {
            console.log("status", status)

            if (status) {
                req.session.save(() => {
                    res.redirect('http://localhost:4200/dashboard/default');
                })

            } else {
                res.redirect('http://localhost:4200/authenticate/failed');
            }
        }, (error) => {
            res.redirect('http://localhost:4200/authenticate/failed');
        });
    } else {
        res.redirect('http://localhost:4200/authenticate/failed');

    }
})

// router.get('/logout', function (req, res) {
//     req.session.destroy();
//     res.send("logout success!");
// });


module.exports = router;