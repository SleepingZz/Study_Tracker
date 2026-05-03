const { app, BrowserWindow } = require('electron');

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load your index.html or main file here.
    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// On macOS, re-create a window in the app when the dock icon is clicked and there are no other open windows.
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});