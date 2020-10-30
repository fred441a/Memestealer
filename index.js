const fs = require("fs");
const login = require("facebook-chat-api");
const open = require("open");
const express = require('express');
const { measureMemory } = require("vm");
const app = express()
const cors = require("cors");
const port = 3000
var ImageUrl;

//https://generator.email/ntarek.kahrbat@asdbwegweq.xyz
var credentials = { email: "ntarek.kahrbat@asdbwegweq.xyz", password: "k7Az3uwzp3kA5Jc" };

app.use(cors());

app.get('/URL', (req, res) => {
    res.send(ImageUrl)
})

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/Index.html');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

open("Localhost:3000/index");

if (fs.existsSync('appstate.json')) {
    console.log("the file is fucken 'ere mate");
    login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, (err, api) => {
        if (err) {
            console.error(err);
        };
        RunInAPI(api);
    });
} else {
    console.log("The file ain't ere mate")
    login(credentials, (err, api) => {
        if (err) return console.error(err);

        fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));

        RunInAPI(api);
    });
}

function RunInAPI(api) {
    api.listenMqtt((err, message) => {
        console.log(message.type);
        console.log(message.attachments);
        if (message.type == "message" && message.attachments) {
            console.log(message.attachments[0].type);
            if (message.attachments[0].type == "photo") {
                ImageUrl = message.attachments[0].url;
                console.log(message.attachments[0].url);
            }
        }
    });

}
