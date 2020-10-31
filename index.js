const fs = require("fs");
const login = require("facebook-chat-api");

//Electron
const { app, BrowserWindow } = require('electron')
var win;

var ImageUrl;

//https://generator.email/ntarek.kahrbat@asdbwegweq.xyz
var credentials = { email: "ntarek.kahrbat@asdbwegweq.xyz", password: "k7Az3uwzp3kA5Jc" };


//electron

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('Index.html')
    win.setFullScreen(true);
}

function ChangeImage() {
    let code = "document.getElementById('Container').src = '" + ImageUrl + "'"
    win.webContents.executeJavaScript(code);
}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})



//facebook chat api
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
        if (message.type == "message") {
            if (message.attachments.length > 0) {
                console.log(message.attachments[0].type);
                if (message.attachments[0].type == "photo") {
                    ImageUrl = message.attachments[0].url;
                    console.log(message.attachments[0].url);
                    ChangeImage();
                }
            }
        }
    });

}
