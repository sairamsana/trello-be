const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
    res.redirect('https://trello.com/1/authorize?return_url=http://localhost:5000/api/v1/authenticate/parsetoken&expiration=never&scope=read,write,account&response_type=token&key=9303bee3409b8c827da5aec23a86c644&callback_method=fragment');
})

router.get('/parsetoken', (req, res) => {
    console.log(path.basename)
    res.sendFile(path.join("html/parseToken.html"), { root: __dirname });
})

router.post('/savetoken', (req, res) => {
    console.log("req", req.body.token);
    if (req.body.token != null) {

        // ATTA29de146e935829de9eaf00f758cc920259933660fdf36742860382d1cc8a17c6B35CB604

        // res.redirect(url.format({
        //     pathname: "/",
        //     query: {
        //         "a": 1,
        //         "b": 2,
        //         "valid": "your string here"
        //     }
        // }));
    }


    res.send({ name: "Sai Ram Sana" })

})


module.exports = router;