const express = require("express");
const axios = require('axios');
const app = express();
const PORT = 8080;

const CLIENT_ID = "710e010d-4f51-4896-a8b6-5edfbb038dd1"
const CLIENT_SECRET = "tvx5qjILw4WQ23zB8MAU"

app.use(express.static(__dirname + "/public"))


app.get("/login", (req, res) => {
    res.redirect(`https://xauth.shaneumayanga.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_url=http://localhost:8080/callback&response_type=code`)
});

app.get("/callback", async (req, res) => {
    const code = req.query.code;
    const tokenres = await axios({
        method: 'post',
        url: `https://xauth.shaneumayanga.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
        Headers: {
            accept: 'application/json'
        }
    });
    const access_token = tokenres.data.accessToken;

    const result = await axios({
        method: 'post',
        url: `https://xauth.shaneumayanga.com/login/oauth/user`,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${access_token}`
        }
    });
    console.log(result.data)
    res.redirect(`/hello.html?name=${result.data.name}`)


});


app.listen(8080, () => console.log(`App running on PORT : ${PORT}`))

// XAuth :~ xauth.shaneumayanga.com
// Email :~ shaneumayanga445@gmail.com
// website :~ shaneumayanga.com
