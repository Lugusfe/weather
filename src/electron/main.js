const { app } = require('electron')
const path = require('path')

app.whenReady().then(() => {
  const window = require(path.join(__dirname, 'createWindow.js'))
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
