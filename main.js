const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/sqlite3');
// const { handleTableCreate } = require('./database');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    ipcMain.handle('ping', () => 'pong');
    ipcMain.handle('create-table', () => handleTableCreate());

    ipcMain.on('set-title', (event, title) => {
        const webContents = event.sender;
        const win = BrowserWindow.fromWebContents(webContents);
        win.setTitle(title);
    });


    win.loadFile('index.html');
    win.webContents.openDevTools();
    // Open the DevTools.
};

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});


async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (canceled) {
        return;
    } else {
        return filePaths[0];
    }
}

async function handleTableCreate() {
    console.log(`Going to create table`);
    const rows = [];
    db.serialize(function () {
        // db.run("CREATE TABLE Products (name, barcode, quantity)");

        // db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product001', 'xxxxx', 20]);
        // db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product002', 'xxxxx', 40]);
        // db.run("INSERT INTO Products VALUES (?, ?, ?)", ['product003', 'xxxxx', 60]);

        db.each("SELECT * FROM Products", function (err, row) {
            console.log(row);
            rows.push(row);
        });
    });
    console.log(`Table created succ`);

    db.close();

    return rows;

}