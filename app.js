const express = require("express");
const axios = require('axios');
const app = express();
const PORT = 8080;



//register your app :~ xauth.shaneumayanga.com
const CLIENT_ID = "d7c8925a-5763-4420-a780-67b8b8b1fd58"
const CLIENT_SECRET = "0YwL9jcUy3sg6kEdb1NA"

app.use(express.static(__dirname + "/public"))


app.get("/login", (req, res) => {
    res.redirect(`https://xauth.shaneumayanga.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_url=http://localhost:8080/callback&response_type=code`)
});

app.get("/callback", async (req, res) => {
    const code = req.query.code;
    console.log(code);
    const tokenres = await axios({
        method: 'post',
        url: `https://xauth.shaneumayanga.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
        Headers: {
            accept: 'application/json'
        }
    });
    console.log(tokenres);
    const access_token = tokenres.data.accessToken;
    console.log(access_token);
    const result = await axios({
        method: 'post',
        url: `https://xauth.shaneumayanga.com/login/oauth/user`,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    });
    console.log(result.data)
    res.redirect(`/hello.html?name=${result.data.Name}`)
});


app.listen(PORT, () => console.log(`App running on PORT : ${PORT}`))

// XAuth :~ xauth.shaneumayanga.com
// Email :~ me@shaneumayanga.com
// website :~ shaneumayanga.com
