import { app, BrowserWindow } from 'electron'
import path from 'path'
const isDev = process.env.NODE_ENV === 'development'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
    },
  })
  if (isDev) win.loadURL('http://localhost:8080')
  else win.loadFile(path.resolve(__dirname, './index.html'))
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
