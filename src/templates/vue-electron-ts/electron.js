const url = require('url');
const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

const express = require('express')
const expressApp = express();
const port = 5001;
const cors = require('cors');

expressApp.use(cors());
expressApp.options('*', cors());
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

expressApp.get("/app-details", (req, res) => {
    res.send(app.name);
});

expressApp.get("/close-app", (req, res) => {
    app.quit();
});

expressApp.listen(port);

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        url.format({
            pathname: path.join(__dirname, `./dist/index.html`),
            protocol: "file:",
            slashes: true
        })
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});