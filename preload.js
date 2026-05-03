// preload.js - Security Layer for Study Tracker
// This preload script will ensure secure communication between the renderer and main process in Electron.

const { contextBridge, ipcRenderer } = require('electron');

// Securely expose an API to the renderer process
contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        // Whitelist channels
        let validChannels = ['toMain'];
        if (validChannels.includes(channel)) {
            ipcRenderer.send(channel, data);
        }
    },
    receive: (channel, func) => {
        let validChannels = ['fromMain'];
        if (validChannels.includes(channel)) {
            // Strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    }
});