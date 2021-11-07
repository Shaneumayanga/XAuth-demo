const express = require("express");
const axios = require('axios');
const app = express();
const PORT = 8080;

const CLIENT_ID = "8b7367b2-8295-40f7-af2a-606ddddabcca"
const CLIENT_SECRET = "nCN8jOqZ0S6E3tkehv5g"

app.use(express.static(__dirname+"/public"))


app.get("/login",async (req,res)=>{
    res.redirect(`https://xauth.shaneumayanga.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_url=http://localhost:8080/callback&response_type=code`)
});

app.get("/callback", async (req, res) => {
    const code = req.query.code;
    axios({
        method:'post',
        url:`https://xauth.shaneumayanga.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
        Headers:{
            accept: 'application/json'
        }
    }).then((response)=>{
        const access_token = response.data.accessToken;
        res.redirect(`/hello.html?access_token=${access_token}`)

    })
});


app.listen(8080, () => console.log(`App running on PORT : ${PORT}`))