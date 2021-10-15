const {  BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 350,
    height: 250,
    resizable: false,
    fullscreenable: false,
    frame: false,
  })

  win.setIcon(path.join(__dirname, '../assets/sun.png'), 'Weather')
  win.setTitle('Weather')
  win.loadFile(path.join(__dirname, '../index.html'))

  return win
}

module.exports = createWindow()