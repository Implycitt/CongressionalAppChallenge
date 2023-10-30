const { app, BrowserWindow } = require("electron");

let createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Congressional App Challenge",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("./index.html");
    win.on("closed", () => win = null);
}

app.whenReady().then(createWindow);
app.use( express.static( "public" ) );

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
    console.log("Sucessfully shut down application."); 
});

app.on("activate", () => {
    if (win == null) createWindow();
});
