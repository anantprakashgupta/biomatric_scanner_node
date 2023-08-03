const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const Fingerprint2 = require('fingerprintjs2');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

ipcMain.on('capture-fingerprint', (event) => {
  // Capture the fingerprint image here using fingerprintjs2 or other suitable library
  // Save the fingerprint image to a folder
  const imageName = `finger_image_${new Date().toISOString()}.bmp`;
  const imagePath = `finger_images/${imageName}`;

  // Simulating saving the image with dummy data (replace this with actual data)
  const dummyImageData = 'DummyImageData'; // Replace with actual fingerprint image data
  fs.writeFile(imagePath, dummyImageData, (writeErr) => {
    if (writeErr) {
      console.error('Error saving the finger image:', writeErr);
    } else {
      console.log(`Finger image saved as ${imageName}`);
    }
  });

  event.returnValue = imageName; // Return the image name to the renderer process
});

mainWindow.webContents.openDevTools();
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
