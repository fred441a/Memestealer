const fs = require("fs");
const login = require("facebook-chat-api");
const open = require("open");

//https://generator.email/ntarek.kahrbat@asdbwegweq.xyz
var credentials = { email: "ntarek.kahrbat@asdbwegweq.xyz", password: "k7Az3uwzp3kA5Jc" };


if (fs.existsSync('appstate.json')) {
    console.log("the file is fucken 'ere mate");
    login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, (err, api) => {
        if (err){
            console.error(err);
        };
        // Here you can use the api
    });
} else {
    console.log("The file ain't ere mate")
    login(credentials, (err, api) => {
        if (err) return console.error(err);

        fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    });
}

function RunInAPI(){

}